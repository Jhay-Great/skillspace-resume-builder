import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { AdminApprovalService } from '../../../service/admin-approval/admin-approval.service';
import { ApplicantsData } from '@src/app/core/interfaces/user-registration.interface';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { Router } from '@angular/router';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-selected-company-profile',
  standalone: true,
  imports: [ConfirmDialogModule, ButtonModule, TooltipModule, TagModule, PdfViewerModule ],
  templateUrl: './selected-company-profile.component.html',
  styleUrl: './selected-company-profile.component.scss',
})
export class SelectedCompanyProfileComponent implements OnInit {
  isApproved:boolean = false;
  isRejected:boolean = false;
  applicant: ApplicantsData | null = null;
  
  constructor(
    private confirmationService: ConfirmationService,
    private adminApprovalService: AdminApprovalService,
    private destroyRef: DestroyRef,
    private toastService: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.applicant = this.adminApprovalService.selectedUser();
  }

  navigateToHome() {
    this.router.navigate(['/dashboard/approvals']);
  }

  confirm(id:number) {
    this.isApproved = true;
    this.confirmationService.confirm({
      header: 'Accept company',
      message:
        'Are you sure that you want to accept company? This action cannot be reversed.',
      accept: () => {
        this.adminApprovalService.acceptApplicant(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
          {
            next: response => {
              this.toastService.showSuccess('Successful', 'Applicant approved successfully')
              this.isApproved = false;
            },
            error: error => {
              this.toastService.showError('Failed', 'Failed to approve Application')
              this.isApproved = false;
              this.isApproved = false;
              this.navigateToHome();
            },
            complete: () => {
              this.isApproved = false;
              this.navigateToHome();

            }
          }
        );
        this.isApproved = false;
        
      },
      reject: () => {
      this.isApproved = false;
        
      },
    });
  }

  reject(id:number) {
    this.isRejected = true;
    this.confirmationService.confirm({
      header: 'Accept company',
      message:
        'Are you sure that you want to accept company? This action cannot be reversed.',
      accept: () => {
        this.adminApprovalService.rejectApplicant(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
          {
            next: response => {
              this.toastService.showSuccess('Successful', 'Applicant rejected successfully')
              this.isRejected = false;
            },
            error: error => {
              this.toastService.showError('Failed', 'Failed to rejected Application')
              this.isRejected = false;
              this.isRejected = false;
              this.navigateToHome();
            },
            complete: () => {
              this.isRejected = false;
              this.navigateToHome();

            }
          }
        );
        this.isRejected = false;
      },
      reject: () => {
        this.isRejected = false;

      },
    });
  }
}
