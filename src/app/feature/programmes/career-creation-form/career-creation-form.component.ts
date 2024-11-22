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
import { ToastService } from '../../../core/services/toast-service/toast.service';

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
  selectedDate!: Date;

  @Output() closeForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private toastService: ToastService) {
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

  // Toast notification
  successToast() {
    this.toastService.showSuccess(
      'Congratulations',
      'Career programme has been successfully added',
      'top-right'
    );
  }

  // format date
  formatCustomDate(date: Date): string {
    if (!date) return '';
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const suffix =
      day % 10 === 1 && day !== 11
        ? 'st'
        : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
        ? 'rd'
        : 'th';

    return `${day}${suffix} ${month} ${year}`;
  }
  // start and end date
  startDateSelect(event: Date): void {
    const formattedDate = this.formatCustomDate(event);
    this.careerForm.patchValue({ startDate: formattedDate });
  }
  endDateSelect(event: Date): void {
    const formattedDate = this.formatCustomDate(event);
    this.careerForm.patchValue({ endDate: formattedDate });
  }

  // onSubmit
  onSubmit() {
    if (this.careerForm.valid) {
      const formData = this.careerForm.value;
      formData.startDate = this.formatCustomDate(formData.startDate);
      formData.endDate = this.formatCustomDate(formData.endDate);
      this.closeForm.emit();
      this.successToast();
    }
  }
}
