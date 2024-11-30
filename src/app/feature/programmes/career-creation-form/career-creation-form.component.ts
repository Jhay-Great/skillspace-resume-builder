import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from '@src/environments/environment.development';
import { LocalStorageService } from '@src/app/core/services/localStorageService/local-storage.service';

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
// import programmes servvice
import { ProgrammeService } from '../program-service/programme.service';

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

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    public programmeService: ProgrammeService
  ) {
    this.careerForm = this.fb.group({
      name: ['', Validators.required],
      requirements: this.fb.array([]),
      requiredBadges: ['', Validators.required],
      optionalBadges: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.addRequirement();
    if (this.programmeService.currentUpdatingProgram) {
      const programmeToUpdate = this.programmeService.currentUpdatingProgram;
      this.careerForm.patchValue(programmeToUpdate);
      this.careerForm.patchValue({
        startDate: new Date(programmeToUpdate.startDate),
        endDate: new Date(programmeToUpdate.endDate),
      });
    }
  }

  // Getter for the requirements FormArray
  get requirements() {
    return this.careerForm.get('requirements') as FormArray;
  }
  // parse to ngprime date
  parseToPrimeNGCalendarFormat(dateString: string): Date {
    return new Date(dateString);
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
    this.programmeService.currentUpdatingProgram = null;
  }

  // format date
  private formatCustomDate(date: Date): string {
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
  // format Date to iso
  private formatDateToISO(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  // start and end date
  // this was sending the date in 25th november 2023
  startDateSelect(event: Date): void {
    const formattedDate = this.formatCustomDate(event);
    this.careerForm.patchValue({ startDate: formattedDate });
  }
  endDateSelect(event: Date): void {
    const formattedDate = this.formatCustomDate(event);
    this.careerForm.patchValue({ endDate: formattedDate });
  }

  // onSubmit
  onSubmit(saveType: string) {
    console.log('called...')
    if (this.careerForm.valid) {
      // extract form value
      const formData = this.careerForm.value;
      // patch dates
      formData.startDate = this.formatDateToISO(formData.startDate);
      formData.endDate = this.formatDateToISO(formData.endDate);
      // patch user id
      const userId = JSON.parse(this.localStorageService.getUserId('userId'));
      formData.userId = userId;

      if (saveType === 'publish') {
        formData.status = 'PUBLISHED';
        this.programmeService.createProgram(formData);
      }
      if (saveType === 'draft') {
        formData.status = 'DRAFT';
        this.programmeService.createProgram(formData);
      }
      if (saveType === 'update') {
        const programmeId = this.programmeService.currentUpdatingProgram?.id;
        this.programmeService.updateProgram(programmeId?programmeId: null, formData);
        this.programmeService.currentUpdatingProgram = null;
      }
      this.closeForm.emit();
    }
  }
}
