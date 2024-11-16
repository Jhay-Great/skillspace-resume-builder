import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { InputFieldComponent } from "../../../../shared/components/input-field/input-field.component";
import { FormErrorMessageComponent } from "../../../../shared/components/form-error-message/form-error-message.component";
import { RouterLink } from '@angular/router';
import {
  NgxMaterialIntlTelInputComponent,
  CountryISO,
} from 'ngx-material-intl-tel-input';
import { UserRegistrationService } from '../../service/user-management.service';

@Component({
  selector: 'app-talent-registration',
  standalone: true,
  imports: [InputFieldComponent, FormErrorMessageComponent, ReactiveFormsModule, RouterLink, NgxMaterialIntlTelInputComponent, ],
  templateUrl: './talent-registration.component.html',
  styleUrl: './talent-registration.component.scss'
})
export class TalentRegistrationComponent implements OnInit {
  talentForm!:FormGroup;

  selectedCountry: CountryISO = CountryISO.Ghana;

  constructor (
    private fb: FormBuilder,
    private userRegistrationService: UserRegistrationService,
  ) {}

  ngOnInit(): void {
    this.talentForm = this.fb.group({
      fullName:['', Validators.required],
      email:['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      contact: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.talentForm.invalid) {
      // handle any invalidity here
      return;
    }
    const data = {...this.talentForm.value}
    this.userRegistrationService.talentSignUp(data).subscribe(value => {
      console.log('response from api: ', value);
    });
  }

  getFormControl(control:string) {
    return this.talentForm.get(control);
  }
  
  get contactControl() {
    return this.talentForm.get('contact') as FormControl<
      string | null
    >;
  }

}
