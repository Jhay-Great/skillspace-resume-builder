import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// primeng modules
import { ConfirmationService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TabViewChangeEvent, TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';

// local imports
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { AdminApprovalService } from '@src/app/feature/user-registration/service/admin-approval/admin-approval.service';
import { ApplicantsData } from '@src/app/core/interfaces/user-registration.interface';
import { TagComponent } from '@shared/components/tag/tag.component';

@Component({
  selector: 'app-applicant-profile',
  standalone: true,
  imports: [TagModule, TableModule, ButtonModule, TabViewModule, BadgeModule, CommonModule, TagComponent, AvatarModule],
  templateUrl: './applicant-profile.component.html',
  styleUrl: './applicant-profile.component.scss',
})
export class ApplicantProfileComponent implements OnInit {
  isLoading = false;
  activeIndex = 0;
  applicant: ApplicantsData | null = null;
  projects = [
    { title: 'UI/UX Quiz 1', progress: 75, score: 20 },
    { title: 'UI/UX Quiz 2', progress: 80, score: 30 },
    { title: 'Frontend Quiz 1', progress: 15, score: 20 },
  ];

  constructor(
    private confirmationService: ConfirmationService,
    private adminApprovalService: AdminApprovalService,
    private destroyRef: DestroyRef,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.applicant = this.adminApprovalService.selectedUser();
  }

  onTabChange(event: TabViewChangeEvent) {
    if (!event) return;
  }

  navigateToApplicantsPage() {
    this.router.navigate(['/dashboard/applicants']);
  }

  confirm(id: number) {
    this.confirmationService.confirm({
      header: 'Accept company',
      message: 'Are you sure that you want to accept company? This action cannot be reversed.',
      accept: () => {
        this.adminApprovalService
          .acceptApplicant(id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.toastService.showSuccess('Successful', 'Applicant approved successfully');
            },
            error: () => {
              this.toastService.showError('Failed', 'Failed to approve Application');
              this.navigateToApplicantsPage();
            },
            complete: () => {
              this.navigateToApplicantsPage();
            },
          });
      },
      reject: () => {
        return;
      },
    });
  }

  reject(id: number) {
    this.confirmationService.confirm({
      header: 'Accept company',
      message: 'Are you sure that you want to accept company? This action cannot be reversed.',
      accept: () => {
        this.adminApprovalService
          .rejectApplicant(id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.toastService.showSuccess('Successful', 'Applicant rejected successfully');
            },
            error: () => {
              this.toastService.showError('Failed', 'Failed to rejected Application');
              this.navigateToApplicantsPage();
            },
            complete: () => {
              this.navigateToApplicantsPage();
            },
          });
      },
      reject: () => {
        return;
      },
    });
  }
}
