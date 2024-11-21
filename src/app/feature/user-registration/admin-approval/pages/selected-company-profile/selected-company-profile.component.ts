import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { AdminApprovalService } from '../../../service/admin-approval/admin-approval.service';

@Component({
  selector: 'app-selected-company-profile',
  standalone: true,
  imports: [ConfirmDialogModule, ButtonModule, TooltipModule, TagModule ],
  templateUrl: './selected-company-profile.component.html',
  styleUrl: './selected-company-profile.component.scss',
})
export class SelectedCompanyProfileComponent implements OnInit {
  isApproved:boolean = false;
  isRejected:boolean = false;
  
  constructor(
    private confirmationService: ConfirmationService,
    private adminApprovalService: AdminApprovalService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    // this.adminApprovalService.getCompanies().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
    //   value => console.log(value),
    // )
  }

  confirm() {
    this.isApproved = true;
    console.log(this.isRejected, this.isApproved);
    this.confirmationService.confirm({
      header: 'Accept company',
      message:
        'Are you sure that you want to accept company? This action cannot be reversed.',
      accept: () => {
        this.isApproved = false;
        
      },
      reject: () => {
      this.isApproved = false;
        
      },
    });
  }

  reject() {
    this.isRejected = true;
    console.log(this.isRejected, this.isApproved);
    this.confirmationService.confirm({
      header: 'Accept company',
      message:
        'Are you sure that you want to accept company? This action cannot be reversed.',
      accept: () => {
        this.isRejected = false;
      },
      reject: () => {
        this.isRejected = false;

      },
    });
  }
}
