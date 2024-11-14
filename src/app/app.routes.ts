import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./feature/authentication/pages/login/login.component').then(
            (d) => d.LoginComponent
          ),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import(
            './feature/authentication/pages/forgot-password/forgot-password.component'
          ).then((d) => d.ForgotPasswordComponent),
      },
      {
        path: 'forgot-password/otp',
        loadComponent: () =>
          import(
            './feature/authentication/pages/forgot-password-otp/forgot-password-otp.component'
          ).then((d) => d.ForgotPasswordOtpComponent),
      },
      {
        path: 'create-password',
        loadComponent: () =>
          import(
            './feature/authentication/pages/create-password/create-password.component'
          ).then((d) => d.CreatePasswordComponent),
      },
    ],
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
