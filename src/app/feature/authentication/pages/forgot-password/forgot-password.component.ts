import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CapitalizePipe } from '../../../../core/pipes/capitalize/capitalize.pipe';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { getFormErrorMessage } from '../../../../shared/utils/form-utils';
import { Router, RouterLink } from '@angular/router';
import { ForgotPasswordService } from '../../services/forgot-password-service/forgot-password.service';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ButtonModule,
    CapitalizePipe,
    ReactiveFormsModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    RouterLink,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  forgotPasswordLoading = false;

  constructor(
    private fb: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    private toastService: ToastService,
    private router: Router
  ) {
    // Initialize forgot Password form
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.forgotPasswordLoading = true;
      // send forgot password request
      const { email } = this.forgotPasswordForm.value;
      this.forgotPasswordService.setUserEmail(email);
      this.forgotPasswordService.makeOtpRequest(email).subscribe({
        next: (response) => {
          this.forgotPasswordLoading = false;
          this.toastService.showSuccess('Success', 'OTP has been sent. Check your mail');
          this.router.navigate(['/auth/forgot-password/otp']);

        },
        error: (error) => {
          this.forgotPasswordLoading = false;
          this.toastService.showError('Error', error.error);
        },
      });
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string): string {
    return getFormErrorMessage(controlName, this.forgotPasswordForm);
  }
}
