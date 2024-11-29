import { Component, DestroyRef, viewChild, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// primeng modules
import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';

// local modules or imports
import { ApplicantResponse, ApplicantsData, ApplicantData } from '@src/app/core/interfaces/user-registration.interface';
import { TagComponent } from '@shared/components/tag/tag.component';
import { SearchInputComponent } from '@shared/components/search-input/search-input.component';
import { ToastService } from '@core/services/toast-service/toast.service';
import { InitialsPipe } from '@core/pipes/initials/initials.pipe';
import { EllipsisPipe } from '@core/pipes/truncate-with-ellipsis/ellipsis.pipe';
import { CapitalizePipe } from '@core/pipes/capitalize/capitalize.pipe';
import { AdminApprovalService } from '@src/app/feature/user-registration/service/admin-approval/admin-approval.service';


interface Status {
  name: string;
  value: string;
}

@Component({
  selector: 'app-applicants',
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
    InitialsPipe,
    EllipsisPipe,
    CapitalizePipe,
  ],
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.scss'
})
export class ApplicantsComponent {
  applicants!: ApplicantsData[];
  selectedStatus!:Status;
  isLoading:boolean = false;
  table = viewChild<Table>('dt1');

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
    this.table()?.filterGlobal(query, 'contains');
  }

  handleStatus() {
    return [
      {name: 'All status', value: 'All'},
      {name: 'Pending', value: 'Pending'},
      {name: 'Rejected', value: 'Rejected'},
      {name: 'Shortlisted', value: 'Shortlisted'},
    ]
  }

  chooseStatus(value:Status) {
    if (!value) return;
    const {value: status} = value
  }
}
