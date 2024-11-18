import { Component } from '@angular/core';
import { OtpVerificationComponent } from "../../../shared/components/otp-verification/otp-verification.component";
import { UserRegistrationService } from '../service/user-registration.service';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';

@Component({
  selector: 'app-user-verification',
  standalone: true,
  imports: [OtpVerificationComponent, ],
  templateUrl: './user-verification.component.html',
  styleUrl: './user-verification.component.scss'
})
export class UserVerificationComponent {

  constructor (
    private userRegistration: UserRegistrationService,
    private toastService: ToastService,
  ) {};
  
  onSubmitOTP(otp:string) {
    this.userRegistration.verifyOTP(otp);
    this.toastService.showSuccess('success', 'something');

  }

}
