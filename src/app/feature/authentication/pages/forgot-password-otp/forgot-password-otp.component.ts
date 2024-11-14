import { Component, ViewChild } from '@angular/core';
import { OtpVerificationComponent } from '../../../../shared/components/otp-verification/otp-verification.component';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../../../core/services/toast-service/toast.service';

@Component({
  selector: 'app-forgot-password-otp',
  standalone: true,
  imports: [OtpVerificationComponent, ReactiveFormsModule, ButtonModule],
  templateUrl: './forgot-password-otp.component.html',
  styleUrl: './forgot-password-otp.component.scss',
})
export class ForgotPasswordOtpComponent {
  @ViewChild(OtpVerificationComponent) otpComponent!: OtpVerificationComponent;

  constructor(private toastService: ToastService){};

  verifyOTP(verificationCode: string) {
    // Verify user OTP
    // Show success or error toast notification 
    this.toastService.showSuccess('Congratulations!', 'Your verification was successful.');
    // redirect route to create password page
   
  }

}
