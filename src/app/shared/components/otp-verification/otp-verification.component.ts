import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { getFormErrorMessage } from '../../utils/form-utils';
import { ButtonModule } from 'primeng/button';
import { CapitalizePipe } from '../../../core/pipes/capitalize/capitalize.pipe';
import { InputOtpModule } from 'primeng/inputotp';
import { FormatTimePipe } from '@src/app/core/pipes/format-time/format-time.pipe';
import { TimerService } from '@src/app/core/services/timer-service/timer.service';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    CapitalizePipe,
    InputOtpModule,
    FormatTimePipe,
  ],
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.scss',
})
export class OtpVerificationComponent {
  verificationForm: FormGroup;
  verificationLoading: boolean = false;
  @Output() onVerify: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, public timerService: TimerService) {
    this.verificationForm = this.fb.group({
      verificationCode: ['', [Validators.required]],
    });

    this.timerService.startTimer();
  }

  onSubmit() {
    // verify users otp
    if (this.verificationForm.valid) {
      this.verificationLoading = true;

      const { verificationCode } = this.verificationForm.value;

      this.onVerify.emit(verificationCode);

      console.log('verification code : ', this.verificationForm.value);
    } else {
      this.verificationForm.markAllAsTouched();
    }
  }

  setLoadingStatus(status: boolean) {
    this.verificationLoading = status;
  }

  getErrorMessage(controlName: string): string {
    return getFormErrorMessage(controlName, this.verificationForm);
  }

  requestNewVerificationCode() {
    // request a new verification code .
    // restart timer on success
    this.timerService.restartTimer();
  }
}
