import { Component, DestroyRef } from '@angular/core';
import { ApplicantResponse, ApplicantsData, IApplicantData } from '@src/app/core/interfaces/user-registration.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdminApprovalService } from '../../service/admin-approval/admin-approval.service';
import { TagComponent } from '@shared/components/tag/tag.component';
import { SearchInputComponent } from '@src/app/shared/components/search-input/search-input.component';

// primeng modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    TagModule,
    AvatarModule,
    OverlayPanelModule,
    TagComponent,
    SearchInputComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  applicants!: ApplicantsData[];

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
          console.log(response.data);
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
    console.log(query);
  }
}
