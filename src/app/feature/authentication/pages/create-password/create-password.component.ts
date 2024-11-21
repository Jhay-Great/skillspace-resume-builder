import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { getFormErrorMessage } from '../../../../shared/utils/form-utils';
import { CapitalizePipe } from '../../../../core/pipes/capitalize/capitalize.pipe';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ForgotPasswordService } from '../../services/forgot-password-service/forgot-password.service';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';

@Component({
  selector: 'app-create-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CapitalizePipe,
    IconFieldModule,
    InputIconModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.scss',
})
export class CreatePasswordComponent {
  createPasswordForm: FormGroup;
  createPasswordLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private forgotPasswordService: ForgotPasswordService,
    private toastService: ToastService
  ) {
    this.createPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.createPasswordForm.valid) {
      this.createPasswordLoading = true;
      const { password } = this.createPasswordForm.value;

      // send create password request
      const newUserCredentials = {
        email: this.forgotPasswordService.userEmail() as string,
        password,
      };

      this.forgotPasswordService
        .createNewPassword(newUserCredentials)
        .subscribe({
          next: (response) => {
            this.createPasswordLoading = false;
            this.toastService.showSuccess(
              'Congratulations',
              'Password has been set successfully'
            );
            this.router.navigate(['/auth/login']);
          },
          error: (error) => {
            this.createPasswordLoading = false;
            this.toastService.showError('Error', error.error);
          },
        });
    } else {
      this.createPasswordForm.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string): string {
    return getFormErrorMessage(controlName, this.createPasswordForm);
  }
}
