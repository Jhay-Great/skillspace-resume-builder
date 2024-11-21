import { Component, DestroyRef } from '@angular/core';
import { ApplicantResponse, ApplicantsData, IApplicantData } from '@src/app/core/interfaces/user-registration.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdminApprovalService } from '../../service/admin-approval/admin-approval.service';

// primeng modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    TagModule,
    AvatarModule,
    OverlayPanelModule,
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
    else return 'info';
  }
}
