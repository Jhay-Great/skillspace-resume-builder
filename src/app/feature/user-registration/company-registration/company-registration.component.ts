import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-registration',
  standalone: true,
  imports: [ReactiveFormsModule, ],
  templateUrl: './company-registration.component.html',
  styleUrl: './company-registration.component.scss'
})
export class CompanyRegistrationComponent implements OnInit {
  companyForm!:FormGroup;

  constructor (
    private fb: FormBuilder,
  ) {};

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: [''],
    })
  }

}
