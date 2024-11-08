import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./core/layouts/dashboard-layout/dashboard-layout.component').then(
        (d) => d.DashboardLayoutComponent
      ),
    children: [
      {
        path: 'company-programmes',
        loadComponent: () =>
          import('./feature/programmes/company/company.component').then(
            (d) => d.CompanyComponent
          ),
      },
    ],
  },
];
