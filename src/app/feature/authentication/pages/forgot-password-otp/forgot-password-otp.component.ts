import { Component, ViewChild } from '@angular/core';
import { OtpVerificationComponent } from '../../../../shared/components/otp-verification/otp-verification.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
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

  constructor(private router: Router){};

  verifyOTP(verificationCode: any) {
    console.log('about to verify otp code: ', verificationCode);

    // Verify user OTP
    this.fakeApiCall(verificationCode)
      .then((response) => {
        console.log('OTP verified successfully:', response);
        this.otpComponent.setLoadingStatus(false); // Set loading to false on success
        this.router.navigate(['/auth/create-password']);
      })
      .catch((error) => {
        console.error('Failed to verify OTP:', error);
        this.otpComponent.setLoadingStatus(false); // Set loading to false on error
      });
  }

  fakeApiCall(verificationCode: any): Promise<any> {
    // Simulate an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a successful response
        resolve({ success: true });
      }, 2000);
    });
  }
}
