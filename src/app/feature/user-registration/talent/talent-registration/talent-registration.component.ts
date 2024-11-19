import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import { FormErrorMessageComponent } from '@shared/components/form-error-message/form-error-message.component';
import { RouterLink } from '@angular/router';
import {
  NgxMaterialIntlTelInputComponent,
  CountryISO,
} from 'ngx-material-intl-tel-input';
import { InputIconModule } from 'primeng/inputicon';
import { UserRegistrationService } from '../../service/user-registration.service';
import { confirmPasswordValidator } from '@src/app/shared/utils/password.validator';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-talent-registration',
  standalone: true,
  imports: [
    InputFieldComponent,
    FormErrorMessageComponent,
    ReactiveFormsModule,
    RouterLink,
    NgxMaterialIntlTelInputComponent,
    InputIconModule,
  ],
  templateUrl: './talent-registration.component.html',
  styleUrl: './talent-registration.component.scss',
})
export class TalentRegistrationComponent implements OnInit, OnDestroy {
  talentForm!: FormGroup;
  isLoading: boolean = false;
  subscription!:Subscription;

  selectedCountry: CountryISO = CountryISO.Ghana;

  constructor(
    private fb: FormBuilder,
    private userRegistrationService: UserRegistrationService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.talentForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      contact: ['', Validators.required],
    }, {validators: confirmPasswordValidator('password', 'confirmPassword')});
  }

  onSubmit() {
    this.isLoading = true;
    if (this.talentForm.invalid) {
      // handle any invalidity here
      return;
    }
    const data = { ...this.talentForm.value };
    
    this.subscription = this.userRegistrationService.talentSignUp(data).subscribe({
        next: response => {
            this.reset();
            this.isLoading = false;
        this.userRegistrationService.user.set('TALENT');
        this.router.navigate(['/auth/user-verification']);
      },
      error: error => {
        this.isLoading = false;
        this.toastService.showError('Error', error.message);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  getFormControl(control: string) {
    return this.talentForm.get(control);
  }

  get contactControl() {
    return this.talentForm.get('contact') as FormControl<string | null>;
  }
  reset() {
    this.talentForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
