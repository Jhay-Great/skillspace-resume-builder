import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormArray,
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
} from '@angular/forms';

// local imports
import { PageHeaderDescriptionComponent } from '../../../../shared/components/page-header-description/page-header-description.component';

// primeng modules
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
// import { InputTextModule } from 'primeng/inputtext';

import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { CountryCode } from 'ngx-material-intl-tel-input/lib/data/country-code';
// profile service
import { ProfileService } from '../../profile service/profile.service';
import { Country } from '@src/app/core/interfaces/interfaces';
import { DropdownModule } from 'primeng/dropdown';

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
  ],
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.scss',
})
export class ProfileManagementComponent {
  educationForm!: FormGroup;
  countries: Country[] = [];
  selectedCountry: Country = {
    name: 'Ghana',
    flag: 'https://flagcdn.com/gs.svg',
  };
  isOpen: boolean = false;

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
    // education form
    this.educationForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      Country: ['', Validators.required],
      qualificationLevel: ['', Validators.required],
      programme: ['', Validators.required],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      transcript: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.profileService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }

  description =
    'This is what employers will see on your profile and what will appear on all your earned certificates.';

  educationDescription = 'This is what employers will see on your profile';
}
