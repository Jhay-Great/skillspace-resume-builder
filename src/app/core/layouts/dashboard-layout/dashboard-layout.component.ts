import { Component, OnInit, effect, Signal, computed } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from '@src/app/feature/authentication/services/auth-service/auth.service';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ExtendedConfirmation } from '../../interfaces/confirmation.interface';
import { UserRole } from '@src/app/feature/authentication/models/auth.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/appState';
import { onLoadTalentData } from '@src/app/feature/profile-management/talent/state/talentProfile.action';
import { isTalentProfileLoaded, selectTalentProfile } from '@src/app/feature/profile-management/talent/state/talentProfile.selector';
import { ProfileData, TalentProfile } from '../../interfaces/profile-management.interface';
import { AvatarModule } from 'primeng/avatar';
import { InitialsPipe } from "../../pipes/initials/initials.pipe";
import { onLoadCompanyData } from '@src/app/feature/profile-management/company/state/companyProfile.action';
import { isCompanyProfileLoaded, selectCompanyProfile } from '@src/app/feature/profile-management/company/state/companyProfile.selector';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ButtonModule, ConfirmDialogModule, AvatarModule, InitialsPipe],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent implements OnInit {
  talentData: Signal<TalentProfile | null> = computed(() => this.store.selectSignal(selectTalentProfile)());
  companyData: Signal<ProfileData | null> = computed(() => this.store.selectSignal(selectCompanyProfile)());
  isCompanyProfileLoaded: Signal<boolean> = computed(() => this.store.selectSignal(isCompanyProfileLoaded)());
  isTalentProfileLoaded: Signal<boolean> = computed(() => this.store.selectSignal(isTalentProfileLoaded)());

  constructor(
    public authService: AuthService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    if (this.authService.userRole === 'TALENT') {
      this.store.dispatch(onLoadTalentData());
    }
    if (this.authService.userRole === 'COMPANY') {
      this.store.dispatch(onLoadCompanyData());
    }

    
  }

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
    // {
    //   name: 'Messages',
    //   path: 'dashboard/messages',
    //   icon: 'pi pi-comments',
    // },
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
      path: 'programme-application',
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
