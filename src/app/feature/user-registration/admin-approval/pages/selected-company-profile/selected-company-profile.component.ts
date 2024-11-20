import { Component } from '@angular/core';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-selected-company-profile',
  standalone: true,
  imports: [ConfirmDialogModule, ButtonModule, TooltipModule, TagModule ],
  templateUrl: './selected-company-profile.component.html',
  styleUrl: './selected-company-profile.component.scss',
})
export class SelectedCompanyProfileComponent {
  isApproved:boolean = false;
  isRejected:boolean = false;
  
  constructor(private confirmationService: ConfirmationService) {}

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
