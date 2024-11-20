import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '@src/app/feature/authentication/services/auth-service/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ButtonModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {
  constructor(public authService: AuthService) {}

  // ADMIN
  adminTabs = [
    {
      name: 'Company Approvals',
      path: 'dashboard/company-approvals',
      icon: 'pi pi-check-circle',
      role: ['ADMIN', 'COMPANY', 'TALENT'],
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
      icon: 'pi pi-courses',
    },
    {
      name: 'Assessments',
      path: 'dashboard/assessments',
      icon: 'pi pi-book',
    },
    {
      name: 'Applicants',
      path: 'dashboard/applicants',
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
      path: 'dashboard/assessments',
      icon: 'pi pi-book',
    },
    {
      name: 'Applications',
      path: 'dashboard/applications',
      icon: 'pi pi-briefcase',
    },
  ];

  logout() {
    console.log('about to logout');
    this.authService.logout();
  }
}
