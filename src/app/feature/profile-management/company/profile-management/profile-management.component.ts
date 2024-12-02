import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// primeng modules
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { NgxMaterialIntlTelInputComponent, CountryISO, } from 'ngx-material-intl-tel-input';

// local imports
import { PageHeaderDescriptionComponent } from '@shared/components/page-header-description/page-header-description.component';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { DrapNDropFileInputComponent } from "@shared/components/drap-n-drop-file-input/drap-n-drop-file-input.component";
import { confirmPasswordValidator, passwordStrengthValidator } from '@shared/utils/password.validator';
import { onFileUpload } from '@shared/utils/file-upload'
import { ProfileManagementService } from '../../services/profile-management.service';
import { createFromData } from '@shared/utils/file-upload';

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
    DrapNDropFileInputComponent
],
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.scss',
})
export class ProfileManagementComponent implements OnInit {
  description = 'This is what applicants will see on your profile.'
  fileUploaded: FileList | null = null;
  previewImage:string | null = null;
  activeTabIndex:number = 0;
  selectedCountry: CountryISO = CountryISO.Ghana;

  // form groups
  companyDetailsForm!: FormGroup;
  documentForm!: FormGroup;
  securityForm!: FormGroup;

  constructor (
    private fb: FormBuilder,
    private profileService: ProfileManagementService,
    private toastService: ToastService,
    private destroyRef: DestroyRef,
  ) {};

  ngOnInit(): void {
    // company details form
    this.companyDetailsForm = this.fb.group({
      name: ['', Validators.required],
      email: ['email@som.com'],
      website: ['', Validators.required],
      contact: ['', Validators.required],
      logo: [''],
    });

    // document form
    this.documentForm = this.fb.group({});

    // security form
    this.securityForm = this.fb.group({
      oldPassword: [''],
      newPassword: ['', [Validators.required, Validators.minLength, passwordStrengthValidator()]],
      confirmPassword: ['', [Validators.required]],
    }, {validators: confirmPasswordValidator('newPassword', 'confirmPassword')});
  }
  
  // specific for ngx-material-intl-tel-input component
  get contactControl() {
    return this.companyDetailsForm.get('contact') as FormControl<
      string | null
    >;
  }

  onUpload(file:File | null):void {
    onFileUpload(this.companyDetailsForm, file, 'logo');
  }

  validateForm(form:FormGroup) {
    if (form.invalid) {
      this.toastService.showError('Invalid data', 'Ensure all fields are filled');
      return null;
    };
    return form.value;
  }

  onSubmit<T>(data:T) {
    this.profileService.updateCompanyProfile(data);
  }
  
  onSaveChanges ():void {
    switch(this.activeTabIndex) {
      
      // company details form
      case 0:
        const companyDetailsData = this.validateForm(this.companyDetailsForm);
        const companyFormData = createFromData(companyDetailsData);
        this.onSubmit(companyFormData);
        break;

        // document form data
        case 1:
        const documentData = this.validateForm(this.documentForm);
        const documentFormData = createFromData(documentData);
        this.onSubmit(documentFormData);
        break;
        
        // security form data
        case 2:
        const securityData = this.validateForm(this.securityForm);
        this.onSubmit(securityData);
        break;
      default:
    }
  }

  onTabChange(event: { index: number }): void {
    this.activeTabIndex = event.index;
  }
  
}
