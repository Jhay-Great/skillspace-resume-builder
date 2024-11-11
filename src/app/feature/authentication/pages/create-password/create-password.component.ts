import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { getFormErrorMessage } from '../../../../shared/utils/form-utils';
import { CapitalizePipe } from '../../../../core/pipes/capitalize/capitalize.pipe';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CapitalizePipe,
    IconFieldModule,
    InputIconModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.scss',
})
export class CreatePasswordComponent {
  createPasswordForm: FormGroup;
  createPasswordLoading = false;

  constructor(private fb: FormBuilder) {
    this.createPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.createPasswordForm.valid) {
      console.log(this.createPasswordForm.value);
      this.createPasswordLoading = true;
    } else {
      this.createPasswordForm.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string): string {
    return getFormErrorMessage(controlName, this.createPasswordForm);
  }
}
