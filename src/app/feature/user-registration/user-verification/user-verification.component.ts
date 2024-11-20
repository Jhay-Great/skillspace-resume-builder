import { Component, DestroyRef } from '@angular/core';
import { OtpVerificationComponent } from "../../../shared/components/otp-verification/otp-verification.component";
import { UserRegistrationService } from '../service/user-registration.service';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ITalentRegistrationResponse } from '@src/app/core/interfaces/user-registration.interface';

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
    private router: Router,
    private destroyRef: DestroyRef,
  ) {};
  
  onSubmitOTP(token:string) {
    const userEmail = this.userRegistration.userEmail();
    if (!userEmail) return;
    console.log(userEmail);

    const data = { token, email: userEmail };
    console.log(data);
    this.userRegistration.verifyOTP(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        console.log(response);
        this.toastService.showSuccess('success', 'Your verification was successful');
    
        this.user = this.userRegistration.user()
    
        if (this.user === 'COMPANY') {
          this.router.navigate(['auth/review/awaiting']);
        }
        if (this.user === 'TALENT') {
          this.router.navigate(['auth/login']);
    
        }

      },
      error: error => {
        console.log('error: ', error);
        this.toastService.showError('Error', 'The verification code provided is invalid');
      },
      complete: () => {
        console.log('done')
      }
    });
  }

}
