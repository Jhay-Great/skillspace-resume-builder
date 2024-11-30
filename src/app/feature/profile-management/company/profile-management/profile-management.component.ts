import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  description:string = 'This is what applicants will see on your profile.'
  fileUploaded: FileList | null = null;
  previewImage:string | null = null;
  activeTabIndex:number = 0;
  selectedCountry: CountryISO = CountryISO.Ghana;

  // form groups
  companyDetailsForm!: FormGroup;
  documentForm!: FormGroup;
  securityForm!: FormGroup;

  constructor (
    private toastService: ToastService,
    private fb: FormBuilder,
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

  onSaveChanges ():void {
    switch(this.activeTabIndex) {
      case 0:
        this.validateForm(this.companyDetailsForm);
        // call submission functionality
        break;
        case 1:
        this.validateForm(this.documentForm);
        // call submission functionality
        break;
        case 2:
        this.validateForm(this.securityForm);
        // call submission functionality
        break;
      default:

    }
  }

  onUpload(file:File | null) {
    onFileUpload(this.companyDetailsForm, file, 'logo');
  }

  validateForm(form:FormGroup) {
    if (form.invalid) {
      console.log('invalid form: ', form.value);
      return;
    };
    return this.handleFormValue(form.value);
  }

  handleFormValue<D>(data:D) {
    console.log(data);
  }

  onSubmit() {
    // calls the http service method to make the http request
    console.log('called and logging...')

  }
  
  // specific for ngx-material-intl-tel-input component
  get contactControl() {
    return this.companyDetailsForm.get('contact') as FormControl<
      string | null
    >;
  }

  onTabChange(event: { index: number }): void {
    this.activeTabIndex = event.index; // Update the active tab index
    console.log(`Active Tab Index: ${this.activeTabIndex}`);
  }
  
}
