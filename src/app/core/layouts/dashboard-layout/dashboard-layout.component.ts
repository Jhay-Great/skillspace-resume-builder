import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from '@src/app/feature/authentication/services/auth-service/auth.service';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ExtendedConfirmation } from '../../interfaces/confirmation.interface';
import { UserRole } from '@src/app/feature/authentication/models/auth.model';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ButtonModule, ConfirmDialogModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {
  constructor(
    public authService: AuthService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  // ADMIN
  adminTabs = [
    {
      name: 'Company Approvals',
      path: '/dashboard/approvals',
      icon: 'pi pi-check-circle',
    },
  ];

  // COMPANY
  companyTabs = [
    {
      name: 'Dashboard',
      path: 'dashboard',
      icon: 'pi pi-th-large',
    },
    {
      name: 'My Programmes',
      path: 'company-programmes',
      icon: 'pi pi-graduation-cap',
    },
    {
      name: 'Assessments',
      path: 'assessment-creation',
      icon: 'pi pi-book',
    },
    {
      name: 'Applicants',
      path: '/dashboard/applicants',
      icon: 'pi pi-users',
    },
    {
      name: 'Messages',
      path: 'dashboard/messages',
      icon: 'pi pi-comments',
    },
  ];

  // TALENT
  talentTabs = [
    {
      name: 'Dashboard',
      path: 'dashboard',
      icon: 'pi pi-th-large',
    },
    {
      name: 'Career Programmes',
      path: 'career-programmes',
      icon: 'pi pi-graduation-cap',
    },
    {
      name: 'Assessments',
      path: 'assessments',
      icon: 'pi pi-book',
    },
    {
      name: 'Applications',
      path: 'dashboard/applications',
      icon: 'pi pi-briefcase',
    },
  ];

  confirm() {
    this.confirmationService.confirm({
      header: 'Logout',
      message: 'Are you sure that you to logout?',
      acceptSeverity: 'danger',
      rejectSeverity: 'secondary',
      acceptLabel: 'Logout',
      rejectLabel: 'Cancel',
      accept: () => {
        this.logout();
      },
      reject: () => {
        return null;
      },
    } as ExtendedConfirmation);
  }

  settings(typeOfUser: UserRole | null) {
    if (typeOfUser === 'COMPANY') {
      this.router.navigate(['/dashboard/company-profile']);
      return;
    } else if (typeOfUser === 'TALENT') {
      this.router.navigate(['/dashboard/talent-profile']);
      return;
    } else {
      return;
    }
  }

  logout() {
    this.authService.logout();
  }
}
