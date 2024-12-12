import { Component, DestroyRef, OnInit, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

// external package imports
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { PdfViewerModule } from 'ng2-pdf-viewer';

// local modules imports
import { AdminApprovalService } from '../../../service/admin-approval/admin-approval.service';
import { ApplicantsData } from '@src/app/core/interfaces/user-registration.interface';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { TagComponent } from '@src/app/shared/components/tag/tag.component';
import { ExtendedConfirmation } from '@src/app/core/interfaces/confirmation.interface';
import { Store } from '@ngrx/store';
import { AppState } from '@src/app/core/state/appState';
import { applicantDetails } from '../../../state/approval.selectors';
import { onLoadApplicants } from '../../../state/approval.actions';

@Component({
  selector: 'app-selected-company-profile',
  standalone: true,
  imports: [ConfirmDialogModule, ButtonModule, TooltipModule, TagModule, PdfViewerModule, TagComponent],
  templateUrl: './selected-company-profile.component.html',
  styleUrl: './selected-company-profile.component.scss',
})
export class SelectedCompanyProfileComponent implements OnInit {
  isApproved = false;
  isRejected = false;
  userId!: number;
  isRejectOrApproved = false;
  applicant!: Signal<ApplicantsData | null>;

  constructor(
    private confirmationService: ConfirmationService,
    private adminApprovalService: AdminApprovalService,
    private destroyRef: DestroyRef,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      const id = value.get('company');
      if (!id) return;
      this.userId = +id;
      this.applicant = this.store.selectSignal(applicantDetails(this.userId));

      if (this.applicant() === null) {
        this.store.dispatch(onLoadApplicants());
      }
    });
    // disabling button if rejected or approved
    if (this.applicant()?.approvalStatus !== 'PENDING') {
      this.isRejectOrApproved = true;
    }
  }

  navigateToHome() {
    this.router.navigate(['/dashboard/approvals']);
  }

  confirm(id: number) {
    this.isApproved = true;
    const applicantName = this.applicant()?.name;
    this.confirmationService.confirm({
      header: 'Accept company',
      message: `Are you sure that you want to accept ${applicantName}? This action cannot be reversed.`,
      acceptSeverity: 'primary',
      rejectSeverity: 'secondary',
      acceptLabel: 'Confirm',
      rejectLabel: 'Cancel',
      accept: () => {
        this.adminApprovalService
          .acceptApplicant(id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.toastService.showSuccess('Successful', 'Applicant approved successfully');
              this.isApproved = false;
              this.navigateToHome();
            },
            error: () => {
              this.toastService.showError('Failed', 'Failed to approve Application');
              this.isApproved = false;
              this.isApproved = false;
              this.navigateToHome();
            },
            complete: () => {
              this.isApproved = false;
              this.navigateToHome();
            },
          });
        this.isApproved = false;
      },
      reject: () => {
        this.isApproved = false;
      },
    } as ExtendedConfirmation);
  }

  reject(id: number) {
    this.isRejected = true;
    const applicantName = this.applicant()?.name;
    this.confirmationService.confirm({
      header: 'Reject company',
      message: `Are you sure that you want to reject ${applicantName}? This action cannot be reversed.`,
      acceptSeverity: 'danger',
      rejectSeverity: 'secondary',
      acceptLabel: 'Reject',
      rejectLabel: 'Cancel',
      accept: () => {
        this.adminApprovalService
          .rejectApplicant(id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.toastService.showSuccess('Successful', 'Applicant rejected successfully');
              this.isRejected = false;
              this.navigateToHome();
            },
            error: () => {
              this.toastService.showError('Failed', 'Failed to rejected application');
              this.isRejected = false;
              this.isRejected = false;
              this.navigateToHome();
            },
            complete: () => {
              this.isRejected = false;
              this.navigateToHome();
            },
          });
        this.isRejected = false;
      },
      reject: () => {
        this.isRejected = false;
      },
    } as ExtendedConfirmation);
  }
}
