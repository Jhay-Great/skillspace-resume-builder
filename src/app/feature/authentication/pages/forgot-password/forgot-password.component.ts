import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CapitalizePipe } from '../../../../core/pipes/capitalize/capitalize.pipe';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { getFormErrorMessage } from '../../../../shared/utils/form-utils';
import { RouterLink } from '@angular/router';

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
    RouterLink
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
forgotPasswordForm: FormGroup;
  forgotPasswordLoading = false;

  constructor(private fb: FormBuilder) {
    // Initialize forgot Password form
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit () { 
    if (this.forgotPasswordForm.valid) {
      this.forgotPasswordLoading = true;
      console.log(this.forgotPasswordForm.value);
      // send forgot password request
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string): string {
    return getFormErrorMessage(controlName, this.forgotPasswordForm); 
  }
}
