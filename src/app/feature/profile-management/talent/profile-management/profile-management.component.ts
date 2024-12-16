import { Component, computed, DestroyRef, effect, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormGroup, FormBuilder, Validators, FormsModule, FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// local imports
import { PageHeaderDescriptionComponent } from '../../../../shared/components/page-header-description/page-header-description.component';
import { DrapNDropFileInputComponent } from '@src/app/shared/components/drap-n-drop-file-input/drap-n-drop-file-input.component';

// primeng modules
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
// import { InputTextModule } from 'primeng/inputtext';

import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgxMaterialIntlTelInputComponent, CountryISO } from 'ngx-material-intl-tel-input';

// profile service
import { ProfileService } from '../../profile service/profile.service';
import { CountriesData, Country } from '@src/app/core/interfaces/interfaces';
import { DropdownModule } from 'primeng/dropdown';
import { Subject, take, takeUntil } from 'rxjs';
import { Status } from '@src/app/core/interfaces/interfaces';
import { CalendarModule } from 'primeng/calendar';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';
import { ProfileManagementService } from '../../services/profile-management.service';
import { createFromData, onFileUpload } from '@shared/utils/file-upload';
import { extractUpdatedFields, getFormControl, hasError, hasFormError } from '@shared/utils/form-utils';
import { confirmPasswordValidator, passwordStrengthValidator } from '@src/app/shared/utils/password.validator';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { LocalStorageService } from '@src/app/core/services/localStorageService/local-storage.service';
import { TalentProfile } from '@src/app/core/interfaces/profile-management.interface';
import { FormErrorMessageComponent } from "../../../../shared/components/form-error-message/form-error-message.component";
import { Store } from '@ngrx/store';
import { AppState } from '@src/app/core/state/appState';
import { onLoadTalentData } from '../state/talentProfile.action';
import { selectTalentProfile } from '../state/talentProfile.selector';

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
    FormErrorMessageComponent
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
  profilePicture: string | null = null;
  cv: string | null = null;
  transcript: string | null = null;
  activeTabIndex = 0;
  formData!: TalentProfile;
  userEmail!:string;

  // reusable methods
    hasFormError = hasFormError;
    hasError = hasError;

  // signals
  talentProfileSignal: Signal<TalentProfile | null> = computed(() => this.store.selectSignal(selectTalentProfile)()|| null);
  hasTalentProfile = computed(() => !!this.talentProfileSignal());
  // talentData: Signal<TalentProfile | null> = computed(() => this.store.selectSignal(selectTalentProfile)());

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private profileManagementService: ProfileManagementService,
    private destroyRef: DestroyRef,
    private toastService: ToastService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
  ) {
    // personal details form
    this.personalDetailsForm = this.fb.group({
      profilePicture: [''],
      fullName: ['', Validators.required],
      email: [''],
      contact: ['', Validators.required],
      introduction: [''],
      cv: ['', Validators.required],
      linkedIn: [''],
      instagram: [''],
      portfolioLinks: this.fb.array([]),
    });
    // education form
    this.educationForm = this.fb.group({
      schoolName: ['', Validators.required],
      schoolAddress: ['', Validators.required],
      country: [this.selectedCountry, Validators.required],
      qualificationLevel: ['', Validators.required],
      programme: ['', Validators.required],
      educationStatus: ['', Validators.required],
      educationStartDate: ['', Validators.required],
      educationEndDate: ['', Validators.required],
      academicTranscript: ['', Validators.required],
    });
    // security form
    this.securityForm = this.fb.group({
      // oldPassword: [''],
      newPassword: ['', [Validators.required, Validators.minLength(8), passwordStrengthValidator()]],
      confirmPassword: ['', [Validators.required]],
    }, {validators: confirmPasswordValidator('newPassword', 'confirmPassword')});

    effect(() => {
      const talentProfile = this.talentProfileSignal();
      if (talentProfile) {
        this.populateField(talentProfile);
      }
    }, { allowSignalWrites: true });
  }

  // getter for portfolio form array
  get portfolios() {
    return this.personalDetailsForm.get('portfolioLinks') as FormArray;
  }
  // getter for phone number
  get contactControl() {
    return this.personalDetailsForm.get('contact') as FormControl<string | null>;
    // return getFormControl(this.personalDetailsForm, 'contact') as FormControl<string | null>;
  }

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
    const portfolioLinks = this.personalDetailsForm.get('portfolioLinks') as FormArray;
    portfolioLinks.push(this.fb.control(''));
  }
  // remove project link
  removeProjectLink(index: number) {
    const portfolioLinks = this.personalDetailsForm.get('portfolioLinks') as FormArray;
    portfolioLinks.removeAt(index);
  }

  ngOnInit() {
    // dispatching an action
      this.store.dispatch(onLoadTalentData());
    // update profile
    // this.populateField();
    // fetches countries for education form
    this.getCountries();
    // assigns status for education select dropdown
    this.status = [{ label: 'Graduated' }, { label: 'Still in school' }];
    // add inputfield for project link in personal details form
    this.addProjectLink();
  }

  description = 'This is what employers will see on your profile and what will appear on all your earned certificates.';

  educationDescription = 'This is what employers will see on your profile';

  ngOnDestroy() {
    // Trigger the unsubscription when the component is destroyed
    this.destroy$.next();
    this.destroy$.complete();
  }

    onUpload(file: File | null, form:FormGroup, controlName: string): void {
      if (file?.type === 'application/pdf') {
        onFileUpload(form, file, controlName);
        return;
      }
  
      if (file?.type === 'image/png') {
        onFileUpload(form, file, controlName);
        return;
      }
    }

    populateField(response: TalentProfile) {
      if (!response) return;
      // dispatching an action
      // this.store.dispatch(onLoadTalentData());
      // getting talent data
      // next: response => {
        console.log(response);
        const { cv, academicTranscript, profilePicture, email } = response;
        this.cv = cv;
        this.transcript = academicTranscript;
        this.profilePicture = profilePicture;
        this.formData = response;
        this.userEmail = email
        
        this.personalDetailsForm.patchValue(response);
        this.personalDetailsForm.patchValue({
          linkedIn: response.socialMediaLinks[0],
          instagram: response.socialMediaLinks[1],
        });

        
        this.educationForm.patchValue(response);
        console.log('response data: ', response);
        this.educationForm.patchValue({
          educationStartDate: new Date(response.educationStartDate),
          educationEndDate: new Date(response.educationEndDate),
        });
        console.log('another response data: ', response);
        console.log(this.educationForm.value);
        const emailControl = getFormControl(this.personalDetailsForm, 'email');
        emailControl?.disable();

      // },
      // this.profileManagementService.getTalentData().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      //   error: error => {
      //     console.log(error);
      //   }
      // })
      // this.profileManagementService.getTalentData().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      //   next: response => {
      //     console.log(response);
      //     const { cv, academicTranscript, profilePicture } = response;
      //     this.cv = cv;
      //     this.transcript = academicTranscript;
      //     this.profilePicture = profilePicture;
      //     this.formData = response;
          
      //     this.personalDetailsForm.patchValue(response);
      //     this.personalDetailsForm.patchValue({
      //       linkedIn: response.socialMediaLinks[0],
      //       instagram: response.socialMediaLinks[1],
      //     });
      //     this.educationForm.patchValue(response);
      //     this.educationForm.patchValue({
      //       educationStartDate: new Date(response.educationStartDate),
      //       educationEndDate: new Date(response.educationEndDate),
      //     });
      //     const emailControl = getFormControl(this.personalDetailsForm, 'email');
      //     emailControl?.disable();

      //   },
      //   error: error => {
      //     console.log(error);
      //   }
      // })
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
        console.log(data);
        const id: number | null = this.localStorageService.getItem('userId');
        if (!id) return;
        this.profileManagementService
          .updateTalentProfile(data, id)
          .pipe(take(1))
          .subscribe({
            next: (response) => {
              console.log(response);
              this.toastService.showSuccess('Successful', 'Successfully updated', 'top-right');
            },
            error: (errorMessage) => {
              this.toastService.showError('Error', errorMessage ?? 'Sorry an unexpected error occurred', 'top-right');
            },
          });
      }

      onSaveChanges(): void {
        switch (this.activeTabIndex) {
        //   // company details form
          case 0: {
            const companyDetailsData = this.validateForm(this.personalDetailsForm);
            console.log('initial value from form: ', companyDetailsData);
            if (!companyDetailsData) return;
            const { instagram, linkedIn, contact, fullName, introduction, cv, portfolioLinks, profilePicture } = companyDetailsData;
            const data = { socialMediaLinks: [linkedIn, instagram], contact, introduction,  cv, portfolioLinks, fullName,  }
            // const modified = { 
            //   ...data, 
            //   socialMediaLinks: this.arrayToCommaSeparatedString([instagram, linkedIn]), 
            //   portfolioLinks: this.arrayToCommaSeparatedString(portfolioLinks)
            // };
            // console.log('modified data: ', modified);
            // const data = { socialMediaLinks: this.arrayToCommaSeparatedString([instagram, linkedIn]), contact, introduction,  cv, portfolioLinks, fullName }
            const updatedFormData = extractUpdatedFields(data, this.formData); 
            console.log('data after comparison: ', data, updatedFormData);


            const transformedData = {
              ...updatedFormData,
              ...(updatedFormData.socialMediaLinks && {
                socialMediaLinks: this.arrayToCommaSeparatedString(updatedFormData.socialMediaLinks),
              }),
              ...(updatedFormData.portfolioLinks && {
                portfolioLinks: this.arrayToCommaSeparatedString(updatedFormData.portfolioLinks),
              }),
            };
            
            console.log('Transformed Data to be sent to server: ', transformedData);
            
            
            // const companyFormData = createFromData(data);
            // const formData = createFromData(updatedFormData);
            const formData = createFromData(transformedData);
            console.log('formdata: ', formData);
            this.onSubmit(formData);
            break;
          }
          // document form data
          case 1: {
            const educationData = this.validateForm(this.educationForm);
            if (!educationData) return;
            const { country, ...remainingData } = educationData;

            const updatedEducationData = {
              ...remainingData,
              schoolCountry: country?.name,
              educationStatus: educationData.educationStatus?.label,
              educationStartDate: this.formatDate(educationData.educationStartDate),
              educationEndDate: this.formatDate(educationData.educationEndDate),
            };

            // console.log('updating country: ', updatedEducationData);

            const updatedFormData = extractUpdatedFields(updatedEducationData, this.formData);        
            console.log('updated data: ', updatedFormData);
            const formData = createFromData(updatedFormData);
            this.onSubmit(formData);
            break;
          }
          // security form data
          case 2: {

            const securityData = this.validateForm(this.securityForm);
            if (!securityData) return;
            const { newPassword } = securityData;
            const data = { password: newPassword, email: this.userEmail};
            this.profileManagementService.changePassword(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
              next: () => {
                this.toastService.showSuccess('Successful', 'Successfully updates password', 'top-right');
              },
              error: () => {
              this.toastService.showError('Failed', 'Failed to update password', 'top-right');
              }
            })
            this.securityForm.reset();
            break;
            
            // console.log(this.securityForm.value)
            // const securityData = this.validateForm(this.securityForm);
            // if (!securityData) return;
            // this.onSubmit(securityData);
            // this.securityForm.reset();
            // break;
          }
        }
      }

      onTabChange(event: { index: number }): void {
        this.activeTabIndex = event.index;
        console.log(this.activeTabIndex);
      }

      formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
      }

      arrayToCommaSeparatedString<T>(arr: T[]): string {
        return arr.join(', ');
      }
}
