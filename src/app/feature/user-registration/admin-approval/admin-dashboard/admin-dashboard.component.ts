import { Component, DestroyRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// primeng modules
import { TableModule, Table } from 'primeng/table';
import { FilterMatchMode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';

// local modules or imports
import { ApplicantResponse, ApplicantsData, ApplicantData } from '@src/app/core/interfaces/user-registration.interface';
import { AdminApprovalService } from '../../service/admin-approval/admin-approval.service';
import { TagComponent } from '@shared/components/tag/tag.component';
import { SearchInputComponent } from '@src/app/shared/components/search-input/search-input.component';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { InitialsPipe } from '@src/app/core/pipes/initials/initials.pipe';
import { EllipsisPipe } from '@src/app/core/pipes/truncate-with-ellipsis/ellipsis.pipe';
import { CapitalizePipe } from "@core/pipes/capitalize/capitalize.pipe";

interface Status {
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
    TagComponent,
    SearchInputComponent,
    DatePipe,
    EllipsisPipe,
    InitialsPipe,
    CapitalizePipe
],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  applicants!: ApplicantsData[];
  selectedStatus!:Status;
  isLoading:boolean = false;
  @ViewChild('dt1') table!: Table;
  filters: any = {};

  constructor(
    private adminApprovalService: AdminApprovalService,
    private destroyRef: DestroyRef,
    private toastService: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.adminApprovalService
      .getCompanies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: response => {
          this.applicants = response.data;

        },
        error: error => {
          this.toastService.showError('Error', 'Failed to load data')
        },
        complete: () => {},
      });

  }

  getSeverity(status: string) {
    if (status === 'approved') return 'success';
    if (status === 'rejected') return 'danger';
    else return 'warning';
  }

  selectedApplicant(id:number) {
    const applicant = this.applicants.find(user => user.id === id);
    if (!applicant) return;
    this.adminApprovalService.selectedUser.set(applicant);
    this.router.navigate([`/dashboard/approvals/${id}`])
  }

  onSearch(query:string) {
    this.table.filterGlobal(query, 'contains');
  }

  handleStatus() {
    return [
      {name: 'All', value: 'All'},
      {name: 'Pending', value: 'PENDING'},
      {name: 'Approved', value: 'APPROVED'},
      {name: 'Rejected', value: 'REJECTED'},
    ]
  }

  chooseStatus(value:Status) {
    console.log(value);
    if (value.name !== 'All') {
      this.table.filter(value.name, 'approvalStatus', 'equals');
    }else {
      this.table.clear();
    }
  }
}

