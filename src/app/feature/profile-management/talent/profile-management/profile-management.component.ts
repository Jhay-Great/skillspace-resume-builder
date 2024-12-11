import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';

// local imports
import { PageHeaderDescriptionComponent } from '../../../../shared/components/page-header-description/page-header-description.component';
import { DrapNDropFileInputComponent } from '@src/app/shared/components/drap-n-drop-file-input/drap-n-drop-file-input.component';
// primeng modules
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgxMaterialIntlTelInputComponent, CountryISO } from 'ngx-material-intl-tel-input';

import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
// profile service
import { ProfileService } from '../../profile service/profile.service';
import { CountriesData, Country } from '@src/app/core/interfaces/interfaces';
import { DropdownModule } from 'primeng/dropdown';
import { Subject, takeUntil } from 'rxjs';
import { Status } from '@src/app/core/interfaces/interfaces';
import { CalendarModule } from 'primeng/calendar';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';

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
    PageHeaderDescriptionComponent,
    DropdownModule,
    CommonModule,
    FormsModule,
    CalendarModule,
    DrapNDropFileInputComponent,
    InputFieldComponent,
    NgxMaterialIntlTelInputComponent,
    InputTextareaModule,
  ],
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.scss',
})
export class ProfileManagementComponent {
  educationForm!: FormGroup;
  securityForm!: FormGroup;
  personalDetailsForm!: FormGroup;

  countries: CountriesData[] = [];
  selectedCountry: CountriesData = {
    name: 'Ghana',
    flag: 'https://flagcdn.com/gh.svg',
  };
  isOpen: boolean = false;
  private destroy$ = new Subject<void>();
  // education form status
  status: Status[] = [];
  defaultNumberCountry: CountryISO = CountryISO.Ghana;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {
    // perfonal details form
    this.personalDetailsForm = this.fb.group({
      displayName: [''],
      email: [''],
      phoneNumber: [''],
      introduction: [''],
      CV: [''],
      projectLinks: this.fb.array([]),
    });
    // education form
    this.educationForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      country: [this.selectedCountry, Validators.required],
      qualificationLevel: ['', Validators.required],
      programme: ['', Validators.required],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      transcript: ['', Validators.required],
    });
    // security form
    this.securityForm = this.fb.group({
      oldPassword: [''],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  // getter for portfolio form array
  get portfolios() {
    return this.personalDetailsForm.get('projectLinks') as FormArray;
  }
  // getter for phone number
  // get contactControl() {
  //   return this.companyDetailsForm.get('contact') as FormControl<string | null>;
  // }

  // get Countries for form
  getCountries() {
    this.profileService
      .getCountries()
      .pipe(takeUntil(this.destroy$)) // Automatically unsubscribes when component is destroyed
      .subscribe({
        next: (countries) => {
          this.countries = countries;
        },
        error: (_error) => {
          console.log('Error getting countries');
        },
      });
  }

  // add project links
  addProjectLink() {
    const projectLinks = this.personalDetailsForm.get('projectLinks') as FormArray;
    projectLinks.push(this.fb.control(''));
  }
  // remove project link
  removeProjectLink(index: number) {
    const projectLinks = this.personalDetailsForm.get('projectLinks') as FormArray;
    projectLinks.removeAt(index);
  }

  ngOnInit() {
    // fetches countries for edycation form
    this.getCountries();
    // assings status for education select dropdown
    this.status = [{ label: 'Graduated' }, { label: 'Still in school' }];
    // add inputfield for project link in perfonal details form
    this.addProjectLink();
  }

  description = 'This is what employers will see on your profile and what will appear on all your earned certificates.';

  educationDescription = 'This is what employers will see on your profile';

  ngOnDestroy() {
    // Trigger the unsubscription when the component is destroyed
    this.destroy$.next();
    this.destroy$.complete();
  }
}
