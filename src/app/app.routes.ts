import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth-guard/auth.guard';
import { roleGuard } from './core/guards/role-guard/role.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sign-up',
        loadComponent: () =>
          import(
            './feature/user-registration/sign-up-options/sign-up-options.component'
          ).then((sg) => sg.SignUpOptionsComponent),
        title: 'Sign up',
      },
      {
        path: 'company-registration',
        loadComponent: () =>
          import(
            './feature/user-registration/company/company-registration/company-registration.component'
          ).then((cr) => cr.CompanyRegistrationComponent),
        title: 'Company registration',
      },
      {
        path: 'user-verification',
        loadComponent: () =>
          import(
            './feature/user-registration/user-verification/user-verification.component'
          ).then((uv) => uv.UserVerificationComponent),
        title: 'Verification',
      },
      {
        path: 'talent-registration',
        loadComponent: () =>
          import(
            './feature/user-registration/talent/talent-registration/talent-registration.component'
          ).then((tr) => tr.TalentRegistrationComponent),
        title: 'Talent registration',
      },
      {
        path: 'review/:status',
        loadComponent: () =>
          import(
            './feature/user-registration/company/registration-feedback/registration-feedback.component'
          ).then((rf) => rf.RegistrationFeedbackComponent),
        title: 'Review Feedback',
      },
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
    // canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layouts/dashboard-layout/dashboard-layout.component').then(
        (d) => d.DashboardLayoutComponent
      ),
    children: [
      {
        path: 'approvals',
        loadComponent: () =>
          import(
            './feature/user-registration/admin-approval/admin-dashboard/admin-dashboard.component'
          ).then((a) => a.AdminDashboardComponent),
        title: 'Company Approvals',
      },
      {
        path: 'approvals/:company',
        loadComponent: () =>
          import(
            './feature/user-registration/admin-approval/pages/selected-company-profile/selected-company-profile.component'
          ).then((cp) => cp.SelectedCompanyProfileComponent),
        title: 'Company Approval',
      },
      {
        path: 'company-programmes',
        // data: {role: 'ADMIN'},
        // canActivate: [roleGuard],
        loadComponent: () =>
          import('./feature/programmes/company/company.component').then(
            (d) => d.CompanyComponent
          ),
      },
    ],
  },
];
