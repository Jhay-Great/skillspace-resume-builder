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

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, CapitalizePipe, InputOtpModule],
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.scss',
})
export class OtpVerificationComponent {
  verificationForm: FormGroup;
  verificationLoading: boolean = false;
  @Output() onVerify: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.verificationForm = this.fb.group({
      verificationCode: ['', [Validators.required]],
    });
  }

  onSubmit() {
    // verify users otp
    if (this.verificationForm.valid) {
      this.verificationLoading = true;

      const {verificationCode} = this.verificationForm.value

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
}
