import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
// import primeng modules
import { ChipsModule } from 'primeng/chips';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-career-creation-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ChipsModule,
    InputTextModule,
    CalendarModule,
    InputTextareaModule,
  ],
  templateUrl: './career-creation-form.component.html',
  styleUrl: './career-creation-form.component.scss',
})
export class CareerCreationFormComponent {
  careerForm!: FormGroup;
  badgesRequired: string[] = [];
  badgesOptional: string[] = [];
  @Output() closeForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {
    this.careerForm = this.fb.group({
      name: ['', Validators.required],
      requirements: this.fb.array([]),
      requiredBadges: ['', Validators.required],
      optionalBadges: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.addRequirement();
  }

  // Getter for the requirements FormArray
  get requirements() {
    return this.careerForm.get('requirements') as FormArray;
  }

  // Method to add a new field
  addRequirement() {
    this.requirements.push(this.fb.control(''));
  }

  // Method to remove a field at a specified index
  removeField(index: number) {
    this.requirements.removeAt(index);
  }

  // closeform
  close() {
    this.closeForm.emit();
  }
}
