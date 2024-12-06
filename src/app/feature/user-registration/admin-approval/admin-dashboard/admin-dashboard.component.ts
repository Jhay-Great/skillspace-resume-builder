import { Component, DestroyRef, viewChild, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// primeng modules
import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

// local modules or imports
import { ApplicantsData } from '@src/app/core/interfaces/user-registration.interface';
import { AdminApprovalService } from '../../service/admin-approval/admin-approval.service';
import { TagComponent } from '@shared/components/tag/tag.component';
import { SearchInputComponent } from '@shared/components/search-input/search-input.component';
import { ToastService } from '@core/services/toast-service/toast.service';
import { InitialsPipe } from '@core/pipes/initials/initials.pipe';
import { EllipsisPipe } from '@core/pipes/truncate-with-ellipsis/ellipsis.pipe';
import { CapitalizePipe } from '@core/pipes/capitalize/capitalize.pipe';
import { LocalStorageService } from '@src/app/core/services/localStorageService/local-storage.service';

interface PDropDown {
  name: string;
  value: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TagModule,
    AvatarModule,
    OverlayPanelModule,
    DropdownModule,
    CalendarModule,
    TagComponent,
    SearchInputComponent,
    DatePipe,
    InitialsPipe,
    EllipsisPipe,
    CapitalizePipe,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  applicants!: ApplicantsData[];
  selectedStatus!: PDropDown;
  selectedDate!: PDropDown;
  date: string | null = null;
  showCalendar = false;
  isLoading = false;
  table = viewChild<Table>('dt1');
  isOpen = false;

  constructor(
    private adminApprovalService: AdminApprovalService,
    private destroyRef: DestroyRef,
    private toastService: ToastService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.adminApprovalService
      .getCompanies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const { message } = response;
          const applicants = this.adminApprovalService.allApplicants();
          if (applicants) {
            this.applicants = applicants;
            this.toastService.showSuccess('Successful', message, 'top-right');
          }
        },
        error: () => {
          this.toastService.showError('Error', 'Failed to load data', 'top-right');
        },
      });
  }

  selectedApplicant(id: number) {
    this.adminApprovalService.selectedApplicant(id);
    this.router.navigate([`/dashboard/approvals/${id}`]);
  }

  onSearch(query: string) {
    this.table()?.filterGlobal(query, 'contains');
  }

  displayStatus() {
    return [
      { name: 'All', value: 'All' },
      { name: 'Pending', value: 'PENDING' },
      { name: 'Approved', value: 'APPROVED' },
      { name: 'Rejected', value: 'REJECTED' },
    ];
  }
  displayDateFilter() {
    return [
      { name: 'All', value: 'Application date' },
      { name: 'Recent', value: 'recent' },
      { name: 'Last week', value: 'last week' },
      { name: 'Last month', value: 'last month' },
      { name: 'Custom', value: 'custom' },
    ];
  }

  chooseStatus(value: PDropDown) {
    if (value.name !== 'All') {
      this.table()?.filter(value.name, 'approvalStatus', 'equals');
    } else {
      this.table()?.clear();
    }
  }

  chooseDate(value: PDropDown) {
    const today = new Date();
    switch (value.name) {
      case 'All': {
        this.table()?.clear();
        break;
      }
      case 'Recent': {
        const day = today.getDate();
        const recent = day - 1;
        const setDay = today.setDate(recent);
        const calcDay = new Date(setDay);
        const recentDate = `${calcDay.getFullYear()}-${calcDay.getMonth() + 1}-${calcDay.getDate()}`;

        this.table()?.filter(recentDate, 'createdAt', 'contains');
        break;
      }
      case 'Last week': {
        const endOfWeek = today;
        const startOfLastWeek = new Date();
        startOfLastWeek.setDate(endOfWeek.getDate() - 7);
        break;
      }
      case 'Last month': {
        break;
      }
      case 'Custom': {
        break;
      }
    }
  }

  hideCalendar(event: Event) {
    if (!this.showCalendar && !event) return;
  }
}
