import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import {
  NgxMaterialIntlTelInputComponent,
  CountryISO,
} from 'ngx-material-intl-tel-input';

import {
  passwordStrengthValidator,
  confirmPasswordValidator,
} from '../../../../shared/utils/password.validator';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';
import { FileUploadInputFieldComponent } from '../../../../shared/components/file-upload-input-field/file-upload-input-field.component';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

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
  ],
  providers: [MessageService],
  templateUrl: './company-registration.component.html',
  styleUrl: './company-registration.component.scss',
})
export class CompanyRegistrationComponent implements OnInit {
  companyForm!: FormGroup;
  step: number = 1;
  placeholder = 'File must be a PDF';
  label = 'something';
  isAwaitingReview:boolean = false;
  isRejected:boolean = false;
  isSuccessful:boolean = false;

  selectedCountry: CountryISO = CountryISO.Ghana;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.companyForm = this.formInitialization();
  }

  onSubmit() {
    const formData = this.companyForm.value;
    if (this.companyForm.valid) {
      this.isAwaitingReview = true;

    }
    console.log(formData);
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

  onBack() {
    this.step = this.step - 1;
  }

  togglePasswordVisibility(inputElement: HTMLInputElement) {
    console.log('called...');
    inputElement.type = inputElement.type === 'password' ? 'text' : 'password';
  }

  private formInitialization() {
    return this.fb.group(
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
      { validators: confirmPasswordValidator() }
    );
  }

  get contactControl() {
    return this.companyForm.get('information.contact') as FormControl<
      string | null
    >;
  }

  onBasicUploadAuto(event: UploadEvent) {
    console.log(event);
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Auto Mode',
    });
  }

  onPngUpload(file: File | null) {
    console.log('logging file name: ', file?.name);
    if (file) {
      this.companyForm.get('information.logo')?.setValue(file);
    }
  }
  onUpload(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    console.log(formData);
    if (file) {
      this.placeholder = file.name;
      this.companyForm.get('information.certificate')?.setValue(file.name);
    }
  }
}
