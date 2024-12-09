import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { createFromData } from '@src/app/shared/utils/file-upload';
import { AssessmentCreationService } from '../../services/assessment-creation/assessment-creation.service';

@Component({
  selector: 'app-quiz-form',
  standalone: true,
  imports: [CalendarModule, InputTextModule, InputTextareaModule, ReactiveFormsModule, InputSwitchModule],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.scss',
})
export class QuizFormComponent implements OnInit {
  quizForm: FormGroup;
  questionImages: Record<number, File | null> = {};
  questionImagePreviews: Record<number, string | ArrayBuffer | null> = {};
  @Output() submitQuiz = new EventEmitter<FormData>();
  @Input() isUpdate = false;

  constructor(
    private fb: FormBuilder,
    private assessmentCreationService: AssessmentCreationService
  ) {
    this.quizForm = this.fb.group({});
  }

  createOptionsFormGroup(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      isCorrect: [false],
    });
  }

  createQuestionFormGroup(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      points: ['', Validators.required],
      image: [null],
      imageUrl: [null],
      options: this.fb.array([this.createOptionsFormGroup()]),
    });
  }

  ngOnInit(): void {
    this.quizForm = this.fb.group({
      name: ['', Validators.required],
      duration: ['', Validators.required],
      passMark: ['', Validators.required],
      badge: ['', Validators.required],
      isGlobal: [false],
      retakeOption: ['', Validators.required],
      questions: this.fb.array([this.createQuestionFormGroup()]),
    });
  }

  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.controls[questionIndex].get('options') as FormArray;
  }

  getImagePreview(questionIndex: number): string | ArrayBuffer | null {
    return this.questionImagePreviews[questionIndex] || null;
  }

  addQuestion() {
    this.questions.push(this.createQuestionFormGroup());
  }

  addOption(questionIndex: number) {
    const questionFormGroup = this.questions.at(questionIndex) as FormGroup;
    const optionsFormArray = questionFormGroup.get('options') as FormArray;
    optionsFormArray.push(this.createOptionsFormGroup());
  }

  removeQuestion(index: number) {
    if (this.questions.length > 1) {
      this.questions.removeAt(index);
      // Remove images associated with the question
      delete this.questionImages[index];
      delete this.questionImagePreviews[index];
    }
  }

  removeOption(questionIndex: number, optionIndex: number) {
    const optionsFormArray = this.questions.controls[questionIndex].get('options') as FormArray;
    optionsFormArray.removeAt(optionIndex);
  }

  handleFileInput(event: Event, questionIndex: number): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Store the file
      this.questionImages[questionIndex] = file;

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        // Store the preview
        this.questionImagePreviews[questionIndex] = e.target?.result || null;

        // Update the form control with the file
        const questionsArray = this.questions;
        const questionGroup = questionsArray.at(questionIndex) as FormGroup;
        questionGroup.patchValue({ image: file });
      };
      reader.readAsDataURL(file);
    }
  }

  onQuizSubmit() {
    const formData = createFromData(this.quizForm.value);
    this.onSubmit.emit(formData);
  }

  discard() {
    this.assessmentCreationService.closeQuizModals();
  }
}
