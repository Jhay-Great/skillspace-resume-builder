import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';

// primeng modules
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { NgxMaterialIntlTelInputComponent, CountryISO } from 'ngx-material-intl-tel-input';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';

// local imports
import { PageHeaderDescriptionComponent } from '@shared/components/page-header-description/page-header-description.component';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { DrapNDropFileInputComponent } from '@shared/components/drap-n-drop-file-input/drap-n-drop-file-input.component';
import { confirmPasswordValidator, passwordStrengthValidator } from '@shared/utils/password.validator';
import { onFileUpload } from '@shared/utils/file-upload';
import { ProfileManagementService } from '../../services/profile-management.service';
import { createFromData } from '@shared/utils/file-upload';
import { LocalStorageService } from '@core/services/localStorageService/local-storage.service';
import { FormErrorMessageComponent } from '@shared/components/form-error-message/form-error-message.component';
import { hasFormError, hasError, extractUpdatedFields } from '@shared/utils/form-utils';

@Component({
  selector: 'app-profile-management',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    TabViewModule,
    ButtonModule,
    NgxMaterialIntlTelInputComponent,
    PageHeaderDescriptionComponent,
    InputFieldComponent,
    DrapNDropFileInputComponent,
    FormErrorMessageComponent,
  ],
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.scss',
})
export class ProfileManagementComponent implements OnInit {
  description = 'This is what applicants will see on your profile.';
  fileUploaded: FileList | null = null;
  previewImage: string | null = null;
  activeTabIndex = 0;
  logo: string | null = null;
  certificate: string | null = null;
  selectedCountry: CountryISO = CountryISO.Ghana;
  hasFormError = hasFormError;
  hasError = hasError;
  userEmail!: string;
  companyDetailData!: { logo: string; companyName: string; website: string; contact: string };

  // form groups
  companyDetailsForm!: FormGroup;
  documentForm!: FormGroup;
  securityForm!: FormGroup;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileManagementService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    // get data and populates form
    this.populateDetails();
    // company details form
    this.companyDetailsForm = this.fb.group({
      companyName: ['', Validators.required],
      email: [''],
      website: ['', Validators.required],
      contact: ['', Validators.required],
      logo: [''],
    });

    // document form
    this.documentForm = this.fb.group({
      certificate: ['', Validators.required],
    });

    // security form
    this.securityForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(8), passwordStrengthValidator()]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: confirmPasswordValidator('newPassword', 'confirmPassword') }
    );
  }

  // specific for ngx-material-intl-tel-input component
  get contactControl() {
    return this.companyDetailsForm.get('contact') as FormControl<string | null>;
  }

  getFormsControl(form: FormGroup, controlName: string) {
    return form.get(controlName) as FormControl;
  }

  populateDetails() {
    this.profileService
      .getCompanyData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const { logo, companyName, email, website, contact, certificate } = response.data;
          this.companyDetailData = { logo, companyName, website, contact };

          this.logo = logo;
          this.certificate = certificate;
          this.userEmail = email;
          const emailControl = this.getFormsControl(this.companyDetailsForm, 'email');

          this.companyDetailsForm.patchValue({
            companyName: companyName,
            email: email,
            website: website,
            contact: contact,
            logo: logo,
          });

          // disables email input field
          emailControl?.disable();

          this.documentForm.patchValue({
            certificate: certificate,
          });
        },
        error: () => {
          this.toastService.showError('Error', 'Failed to get data', 'top-right');
        },
      });
  }

  onUpload(file: File | null, controlName: string): void {
    if (file?.type === 'application/pdf') {
      onFileUpload(this.documentForm, file, controlName);
      return;
    }

    if (file?.type === 'image/png') {
      onFileUpload(this.companyDetailsForm, file, controlName);
      return;
    }
  }

  validateForm(form: FormGroup) {
    const formControls = form.controls;

    for (const controlName in formControls) {
      const control = formControls[controlName];

      // If any control is invalid, return null and stop processing
      if (control.invalid) {
        this.toastService.showError('Invalid data', 'Ensure all fields are filled properly', 'top-right');
        return null;
      }
    }

    if (form.invalid) {
      this.toastService.showError('Invalid data', 'Ensure all fields are filled', 'top-right');
      return null;
    }
    // returns the form values when form is valid
    return form.value;
  }

  onSubmit<T>(data: T) {
    const id: number | null = this.localStorageService.getItem('userId');
    if (!id) return;
    this.profileService
      .updateCompanyProfile(data, id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.toastService.showSuccess('Successful', 'Successfully updated', 'top-right');
        },
        error: (errorMessage) => {
          this.toastService.showError('Error', errorMessage, 'top-right');
        },
      });
  }

  onSaveChanges(): void {
    switch (this.activeTabIndex) {
      // company details form
      case 0: {
        const companyDetailsData = this.validateForm(this.companyDetailsForm);
        if (!companyDetailsData) return;
        const updatedFormData = extractUpdatedFields(companyDetailsData, this.companyDetailData);
        const companyFormData = createFromData(updatedFormData);
        this.onSubmit(companyFormData);
        break;
      }
      // document form data
      case 1: {
        const documentData = this.validateForm(this.documentForm);
        if (!documentData) return;
        const documentFormData = createFromData(documentData);
        this.onSubmit(documentFormData);
        break;
      }
      // security form data
      case 2: {
        const securityData = this.validateForm(this.securityForm);
        if (!securityData) return;
        const { newPassword } = securityData;
        const data = { password: newPassword, email: this.userEmail};
        this.profileService.changePassword(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: () => {
            this.toastService.showSuccess('Successful', 'Successfully updates password', 'top-right');
          },
          error: () => {
          this.toastService.showError('Failed', 'Failed to update password', 'top-right');
          }
        })
        this.securityForm.reset();
        break;
      }
    }
  }

  onTabChange(event: { index: number }): void {
    this.activeTabIndex = event.index;
  }
}
