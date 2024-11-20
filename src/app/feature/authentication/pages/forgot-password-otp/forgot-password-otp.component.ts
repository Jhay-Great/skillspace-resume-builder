import { Component, ViewChild } from '@angular/core';
import { OtpVerificationComponent } from '../../../../shared/components/otp-verification/otp-verification.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../../../core/services/toast-service/toast.service';
import { ForgotPasswordService } from '../../services/forgot-password-service/forgot-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-otp',
  standalone: true,
  imports: [OtpVerificationComponent, ReactiveFormsModule, ButtonModule],
  templateUrl: './forgot-password-otp.component.html',
  styleUrl: './forgot-password-otp.component.scss',
})
export class ForgotPasswordOtpComponent {
  @ViewChild(OtpVerificationComponent) otpComponent!: OtpVerificationComponent;

  constructor(
    private toastService: ToastService,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
  ) {}

  verifyOTP(verificationCode: string) {
    // Verify user OTP
    const payload = {
      email: this.forgotPasswordService.userEmail() as string,
      token: verificationCode,
    };

    console.log('payload for verify otp: ', payload);
    this.forgotPasswordService.verifyOtp(payload);
    // Show success or error toast notification
    this.toastService.showSuccess(
      'Congratulations!',
      'Your verification was successful.'
    );
    // redirect route to create password page
    this.router.navigate(['auth/create-password'])
  }
}
