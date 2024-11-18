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
import { User } from '../../models/auth.model';

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
    private router: Router
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
        this.router.navigate(['dashboard/admin']);
        break;
      case 'COMPANY':
        this.router.navigate(['dashboard/company']);
        break;
      case 'TALENT':
        this.router.navigate(['dashboard/talent']);
        break;
    }
  }

  handleAuthSuccess(user: User) {
    this.loginLoading = false;
    // store user role and access token in local storage 
    this.authService.setUserRole(user.role);
    this.authService.setAccessToken(user.accessToken);

    // navigate to dashboard based on user's role 
    this.navigateByRole(user.role);

    // show success toast
    this.toastService.showSuccess(
      'Congratulations',
      'Account has been successfully logged into.'
    );
  }

  handleAuthError(error: Error) {
    this.loginLoading = false;
    this.toastService.showError('Error', 'Invalid log in credentials');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginLoading = true;
      const { email, password } = this.loginForm.value;
      // sign user in
      this.authService.login({ email, password }).subscribe({
        next: (user: User) => this.handleAuthSuccess(user),
        error: (error: Error) => this.handleAuthError(error),
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string): string {
    return getFormErrorMessage(controlName, this.loginForm);
  }
}
