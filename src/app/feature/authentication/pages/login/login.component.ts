import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CapitalizePipe } from '../../../../core/pipes/capitalize/capitalize.pipe';
import { getFormErrorMessage } from '../../../../shared/utils/form-utils';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../../core/services/toast-service/toast.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { CustomError, User } from '../../models/auth.model';
import { environment } from '@src/environments/environment.development';
import { LocalStorageService } from '@src/app/core/services/localStorageService/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    ReactiveFormsModule,
    CapitalizePipe,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  loginLoading = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    // Initialize login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      stayLoggedIn: [false],
    });
  }

  navigateByRole(role: string) {
    switch (role) {
      case 'ADMIN':
        this.router.navigate(['/dashboard/approvals']);
        break;
      case 'COMPANY':
        this.router.navigate(['dashboard']);
        break;
      case 'TALENT':
        this.router.navigate(['dashboard']);
        break;
    }
  }

  initiateGoogleLogin() {
    const googleAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${environment.GOOGLE_CLIENT_ID}` +
      `&redirect_uri=http://skillspace.fineprints.design:8080/v1/auth/oauth2/login` +
      `&response_type=code` +
      `&scope=openid%20profile%20email` +
      `&access_type=offline`;

    window.location.href = googleAuthUrl;
  }

  handleAuthSuccess(user: User) {
    this.loginLoading = false;
    // store user role and access token in local storage
    this.authService.setUserRole(user.role);
    const stayLoggedIn = this.loginForm.value.stayLoggedIn;

    // if stay logged in is true, set the refresh token as the access token
    if (stayLoggedIn) {
      this.authService.setToken(user.accessToken, user.refreshToken);
    } else {
      this.authService.setToken(user.accessToken, user.refreshToken);
    }

    // store user id in local storage
    this.localStorageService.setItem('userId', user.userId);

    // navigate to dashboard based on user's role
    this.navigateByRole(user.role);

    // show success toast
    this.toastService.showSuccess(
      'Congratulations',
      'Account has been successfully logged into.'
    );
  }

  handleAuthError(error: CustomError) {
    this.loginLoading = false;
    this.toastService.showError('Error', error?.error);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginLoading = true;
      const { email, password } = this.loginForm.value;
      // sign user in
      this.authService.login({ email, password }).subscribe({
        next: (user: User) => this.handleAuthSuccess(user),
        error: (error: CustomError) => this.handleAuthError(error),
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string): string {
    return getFormErrorMessage(controlName, this.loginForm);
  }

  loginWithGoogle() {
    this.initiateGoogleLogin();
  }
}
