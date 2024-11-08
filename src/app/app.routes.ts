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
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./core/layouts/dashboard-layout/dashboard-layout.component').then(
        (d) => d.DashboardLayoutComponent
      ),
    children: [],
  },
];
