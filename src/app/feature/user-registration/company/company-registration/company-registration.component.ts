import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  NgxMaterialIntlTelInputComponent,
  CountryISO,
} from 'ngx-material-intl-tel-input';
import { InputIconModule } from 'primeng/inputicon';

import {
  passwordStrengthValidator,
  confirmPasswordValidator,
} from '@shared/utils/password.validator';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import { FileUploadInputFieldComponent } from '@shared/components/file-upload-input-field/file-upload-input-field.component';
import { FormErrorMessageComponent } from '@shared/components/form-error-message/form-error-message.component';
import { CompanyRegistrationDetails } from '@src/app/core/interfaces/user-registration.interface';
import { UserRegistrationService } from '../../service/user-registration.service';
import { Subscription } from 'rxjs';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';

@Component({
  selector: 'app-company-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    InputFieldComponent,
    NgxMaterialIntlTelInputComponent,
    FileUploadInputFieldComponent,
    FormErrorMessageComponent,
    InputIconModule,
  ],
  templateUrl: './company-registration.component.html',
  styleUrl: './company-registration.component.scss',
})
export class CompanyRegistrationComponent implements OnInit {
  companyForm!: FormGroup;
  step: number = 1;
  placeholder = 'File must be a PDF';
  isAwaitingReview: boolean = false;
  isLoading: boolean = false;
  subscription!: Subscription;

  selectedCountry: CountryISO = CountryISO.Ghana;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userRegistrationService: UserRegistrationService,
    private toastService: ToastService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group(
      {
        credentials: this.fb.group({
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(8),
              passwordStrengthValidator(),
            ],
          ],
          confirmPassword: ['', [Validators.required]],
        }),
        information: this.fb.group({
          website: ['', Validators.required],
          certificate: ['', Validators.required],
          logo: '',
          contact: ['', Validators.required],
        }),
      },
      {
        validators: confirmPasswordValidator(
          'credentials.password',
          'credentials.confirmPassword'
        ),
      }
    );
  }

  createFromData<T>(data: Record<string, T>) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      } else if (typeof value === 'string') {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, JSON.stringify(value));
      }
    });

    return formData;
  }

  onSubmit() {
    this.isLoading = true; // display loader
    const companyForm = this.companyForm;
    if (companyForm.invalid) {
      this.isLoading = false;
      return;
    }

    const data = {
      ...companyForm.value.credentials,
      ...companyForm.value.information,
    };

    const formData = this.createFromData(data);

    this.userRegistrationService
      .companySignUp(formData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const { email, role } = response.data;
          this.userRegistrationService.userEmail.set(email);
          this.isLoading = false; // hides loader
          this.reset();
          this.userRegistrationService.user.set(role); // get this value from the response object later
          this.router.navigate(['/auth/user-verification']);
        },
        error: (error) => {
          this.isLoading = false;
          this.toastService.showError('Invalid detail', error.error.message);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  onContinue(step = 2) {
    // checks if the stepper 1 is valid before changing to the next step
    if (this.getFormControl('credentials')?.invalid) {
      return;
    }

    // handles the stepper changes
    this.step = step;
  }

  getFormControl(controlName: string) {
    return this.companyForm.get(controlName);
  }

  hasError(controlName: string) {
    const control = this.getFormControl(controlName);

    if (control?.touched && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control?.errors?.['email']) {
        return 'Email is invalid';
      }
      if (controlName.includes('password') && control?.errors?.['minlength']) {
        return 'Password length should be at least 8 characters long';
      }
      if (
        controlName.includes('password') &&
        control?.errors?.['weakPassword']
      ) {
        return 'Password should contain numbers, symbols, and uppercase or lowercase letters';
      }
    }
    return null;
  }

  hasFormError(errorKey: string): string | null {
    if (this.getFormControl('credentials.confirmPassword')?.touched) {
      if (
        this.getFormControl('credentials.confirmPassword')?.errors?.['required']
      ) {
        return 'This field is required';
      } else if (
        this.companyForm.errors?.[errorKey] &&
        this.getFormControl('credentials.confirmPassword')?.dirty
      ) {
        return 'Confirm password is invalid';
      }
    }
    return null;
  }

  onBack() {
    this.step = this.step - 1;
  }

  // specific for ngx-material-intl-tel-input component
  get contactControl() {
    return this.companyForm.get('information.contact') as FormControl<
      string | null
    >;
  }

  reset() {
    this.companyForm.reset();
  }

  onFileUpload(file: File | null, control: string) {
    if (file) {
      this.companyForm.get(`information.${control}`)?.setValue(file);
    }
  }

  onUpload(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    if (file) {
      this.placeholder = file.name;
      this.companyForm.get('information.certificate')?.setValue(file.name);
    }
  }
}
