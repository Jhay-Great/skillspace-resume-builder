import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { passwordStrengthValidator, confirmPasswordValidator } from '../../../shared/utils/password.validator';
import { InputFieldComponent } from "../../../shared/components/input-field/input-field.component";

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
  selector: 'app-company-registration',
  standalone: true,
  imports: [FileUploadModule, ToastModule, CommonModule, ReactiveFormsModule, RouterLink, InputIconModule, IconFieldModule, InputTextModule, FormsModule, NgClass, InputFieldComponent],
  providers: [MessageService],
  templateUrl: './company-registration.component.html',
  styleUrl: './company-registration.component.scss'
})
export class CompanyRegistrationComponent implements OnInit {
  companyForm!:FormGroup;
  step:number = 1;
  placeholder = 'enter your name'
  label = 'something'
  constructor (
    private fb: FormBuilder,
    private messageService:MessageService,
  ) {};

  ngOnInit(): void {
    this.companyForm = this.formInitialization();

  }
  
  onSubmit() {
    const formData = this.companyForm.value;
    console.log(formData)
  }

  onContinue(step = 2) {
    this.step = step;
  }

  getFormControl(controlName:string) {
    return this.companyForm.get(controlName);
  }

  onBack() {
    this.step = this.step - 1;
  }

  togglePasswordVisibility(inputElement: HTMLInputElement) {
    console.log('called...')
    inputElement.type = inputElement.type === 'password' ? 'text' : 'password';
  }

  private formInitialization () {
    return this.fb.group({
      credentials: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), passwordStrengthValidator()]],
        confirmPassword: ['', [Validators.required]],
      }),
      information: this.fb.group({
        website: ['', Validators.required],
        certificate: ['', Validators.required],
        logo: '',
        contact: ['', Validators.required],
      })
    }, { validators: confirmPasswordValidator() })
  }

  onBasicUploadAuto(event: UploadEvent) {
    console.log(event);
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
}



}
