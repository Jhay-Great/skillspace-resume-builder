import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'company-registration',
                loadComponent: () => import('./feature/user-registration/company-registration/company-registration.component').then(cr => cr.CompanyRegistrationComponent),
                title: 'Company registration'
            }
        ]
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./core/layouts/dashboard-layout/dashboard-layout.component').then(d => d.DashboardLayoutComponent),
        children: [],
    },
];
