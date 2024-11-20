import { Component } from '@angular/core';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-selected-company-profile',
  standalone: true,
  imports: [ConfirmDialogModule, ButtonModule, TooltipModule ],
  templateUrl: './selected-company-profile.component.html',
  styleUrl: './selected-company-profile.component.scss',
})
export class SelectedCompanyProfileComponent {
  constructor(private confirmationService: ConfirmationService) {}

  confirm() {
    this.confirmationService.confirm({
      header: 'Accept company',
      message:
        'Are you sure that you want to accept company? This action cannot be reversed.',
      accept: () => {

      },
      reject: () => {
        
      },
    });
  }

  reject() {
    this.confirmationService.confirm({
      header: 'Accept company',
      message:
        'Are you sure that you want to accept company? This action cannot be reversed.',
      accept: () => {

      },
      reject: () => {

      },
    });
  }
}
