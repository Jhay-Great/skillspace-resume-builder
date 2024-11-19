import { Component } from '@angular/core';
import { OtpVerificationComponent } from "../../../shared/components/otp-verification/otp-verification.component";
import { UserRegistrationService } from '../service/user-registration.service';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-verification',
  standalone: true,
  imports: [OtpVerificationComponent, ],
  templateUrl: './user-verification.component.html',
  styleUrl: './user-verification.component.scss'
})
export class UserVerificationComponent {
  user:string | null = null;

  constructor (
    private userRegistration: UserRegistrationService,
    private toastService: ToastService,
    private router: Router
  ) {};
  
  onSubmitOTP(otp:string) {
    this.userRegistration.verifyOTP(otp);
    this.toastService.showSuccess('success', 'something');

    this.user = this.userRegistration.user()

    if (this.user === 'COMPANY') {
      this.router.navigate(['auth/review/awaiting']);
    }
    if (this.user === 'TALENT') {
      this.router.navigate(['auth/login']);

    }
  }

}
