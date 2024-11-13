import { Component, ViewChild } from '@angular/core';
import { OtpVerificationComponent } from '../../../../shared/components/otp-verification/otp-verification.component';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-forgot-password-otp',
  standalone: true,
  imports: [OtpVerificationComponent, ReactiveFormsModule, ButtonModule],
  templateUrl: './forgot-password-otp.component.html',
  styleUrl: './forgot-password-otp.component.scss',
})
export class ForgotPasswordOtpComponent {
  @ViewChild(OtpVerificationComponent) otpComponent!: OtpVerificationComponent;

  constructor(){};

  verifyOTP(verificationCode: any) {
    console.log('about to verify otp code: ', verificationCode);

    // Verify user OTP
    // redirect route to create password page
   
  }

}
