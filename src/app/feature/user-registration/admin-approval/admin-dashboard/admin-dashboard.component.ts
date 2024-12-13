import { Component, viewChild, OnInit, Signal, computed, effect } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

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
import { TagComponent } from '@shared/components/tag/tag.component';
import { SearchInputComponent } from '@shared/components/search-input/search-input.component';
import { ToastService } from '@core/services/toast-service/toast.service';
import { InitialsPipe } from '@core/pipes/initials/initials.pipe';
import { EllipsisPipe } from '@core/pipes/truncate-with-ellipsis/ellipsis.pipe';
import { CapitalizePipe } from '@core/pipes/capitalize/capitalize.pipe';
import { PageHeaderDescriptionComponent } from '@shared/components/page-header-description/page-header-description.component';
import { DateSuffixPipe } from '@core/pipes/datesuffix/date-suffix.pipe';
import { AppState } from '@src/app/core/state/appState';
import { onLoadApplicants } from '../../state/approval.actions';
import { allApplicants, isLoading, successMessage } from '../../state/approval.selectors';

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
    PageHeaderDescriptionComponent,
    InitialsPipe,
    EllipsisPipe,
    CapitalizePipe,
    DateSuffixPipe,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  selectedStatus!: PDropDown;
  selectedDate!: PDropDown;
  date: string | null = null;
  showCalendar = false;
  table = viewChild<Table>('dt1');
  isOpen = false;
  applicants: Signal<ApplicantsData[]> = computed(() => this.store.selectSignal(allApplicants)());
  loading: Signal<boolean> = computed(() => this.store.selectSignal(isLoading)());
  successMessage: Signal<string | null> = computed(() => this.store.selectSignal(successMessage)());
  applicantEffect = effect(
    () => {
      const applicant = this.applicants();
      if (applicant.length !== 0) {
        const message = this.successMessage();
        if (!message) return;
        this.toastService.showSuccess('Successful', message, 'top-right');
      } else {
        // this.toastService.showError('Error', 'Failed to load data', 'top-right');
      }
    },
    { allowSignalWrites: true }
  );

  constructor(
    private toastService: ToastService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(onLoadApplicants());
  }

  selectedApplicant(id: number) {
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

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  chooseDate(value: PDropDown) {
    switch (value.name) {
      case 'All': {
        this.table()?.clear();
        break;
      }
      case 'Recent': {
        const today = new Date();

        // Create a date object for 3 days ago
        const recentDate = new Date(today);
        recentDate.setDate(today.getDate() - 3);

        const formattedRecentDate = this.formatDate(recentDate);

        this.table()?.filter(formattedRecentDate, 'createdAt', 'gte');
        break;
      }
      case 'Last week': {
        const lastWeekDate = new Date();
        lastWeekDate.setDate(lastWeekDate.getDate() - 7);

        const formattedLastWeekDate = this.formatDate(lastWeekDate);

        this.table()?.filter(formattedLastWeekDate, 'createdAt', 'gte');
        break;
      }
      case 'Last month': {
        const lastMonthDate = new Date();
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

        const formattedLastMonthDate = this.formatDate(lastMonthDate);

        this.table()?.filter(formattedLastMonthDate, 'createdAt', 'gte');
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
