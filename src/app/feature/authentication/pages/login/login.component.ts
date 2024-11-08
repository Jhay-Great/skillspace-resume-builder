import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CapitalizePipe } from '../../../../core/pipes/capitalize/capitalize.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    ReactiveFormsModule,
    CapitalizePipe
    
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  loginLoading = false;

  constructor(private fb: FormBuilder) {
    // Initialize login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      stayLoggedIn: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginLoading = true;

      console.log(this.loginForm.value);
      const { email, password } = this.loginForm.value;
      // sign user in
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required') && control.touched) {
      return `${controlName} is required!`;
    }
    if (control?.hasError('email') && control.touched) {
      return 'Invalid email format!';
    }
    return '';
  }
}
