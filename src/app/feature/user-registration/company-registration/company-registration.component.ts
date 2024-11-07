import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-company-registration',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, InputIconModule, IconFieldModule, InputTextModule, FormsModule, NgClass],
  templateUrl: './company-registration.component.html',
  styleUrl: './company-registration.component.scss'
})
export class CompanyRegistrationComponent implements OnInit {
  companyForm!:FormGroup;
  step:number = 1;

  constructor (
    private fb: FormBuilder,
  ) {};

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      credentials: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.min(8)]],
        confirmPassword: ['', [Validators.required]],
      }),
      information: this.fb.group({
        website: ['', Validators.required],
        certificate: ['', Validators.required],
        logo: '',
        contact: ['', Validators.required],
      })
    })
  }
  
  onSubmit() {
    const formData = this.companyForm.value;
    console.log(formData)
  }

  onContinue(step = 2) {
    this.step = step;
  }

  onBack() {
    this.step = this.step - 1;
  }

}
