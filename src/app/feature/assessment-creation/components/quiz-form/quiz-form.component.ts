import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { createFromData } from '@src/app/shared/utils/file-upload';
import { AssessmentCreationService } from '../../services/assessment-creation/assessment-creation.service';
import { CreateQuizData } from '../../models/assessments.model';
import { Observable } from 'rxjs';

interface Question {
  description: string;
  points: number;
  image: File | null;
  imageUrl: string | ArrayBuffer | null;
  options: { text: string; isCorrect: boolean }[];
}

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
  @Output() submitQuiz = new EventEmitter<CreateQuizData>();
  @Input() quizId!: number | null;


  constructor(
    private fb: FormBuilder,
    private assessmentCreationService: AssessmentCreationService
  ) {
    this.quizForm = this.fb.group({});
    // this.quiz$ = this.assessmentCreationService.getQuizById(this.quizId as number);
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
      // image: [null],
      // imageUrl: [null],
      options: this.fb.array([this.createOptionsFormGroup()]),
    });
  }

  ngOnInit(): void {
    if (this.quizId) {
      this.assessmentCreationService.getQuizById(this.quizId as number).subscribe({
        next: (quiz) => {
          console.log('Quiz by id from component: ', quiz);
          this.patchFormWithQuizData(quiz);
        },
        error: (err) => {
          console.log('error from get quiz by Id: ', err);
        },
      });
    }

    this.quizForm = this.fb.group({
      name: ['', Validators.required],
      duration: ['', Validators.required],
      passMark: ['', Validators.required],
      badge: ['', Validators.required],
      isGlobal: [false],
      retakeOption: ['', Validators.required],
      questions: this.fb.array(this.quizId ? [] : [this.createQuestionFormGroup()]), // if it is create quiz then initialize questions with one empty question else initialize questions with empty array
    });
  }

  patchFormWithQuizData(quiz: any): void {
    this.quizForm.patchValue({
      name: quiz.name,
      duration: quiz.duration,
      passMark: quiz.passMark,
      badge: quiz.badge,
      isGlobal: quiz.isGlobal,
      retakeOption: quiz.retakeOption,
    });

    // Populate questions
    const questionsArray = this.questions;
    quiz.questions.forEach((question: any) => {
      const questionGroup = this.fb.group({
        description: [question.description, Validators.required],
        points: [question.points, Validators.required],
        options: this.fb.array(
          question.options.map((option: any) =>
            this.fb.group({
              text: [option.text, Validators.required],
              isCorrect: [option.isCorrect],
            })
          )
        ),
      });
      questionsArray.push(questionGroup);
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
    const formValue = { ...this.quizForm.value };

    // Convert string values to numbers
    formValue.passMark = Number(formValue.passMark);
    formValue.retakeOption = Number(formValue.retakeOption);
    formValue.duration = Number(formValue.duration);

    // Convert points to numbers for each question
    formValue.questions = formValue.questions.map((question: Question) => ({
      ...question,
      points: Number(question.points),
    }));

    // const formData = createFromData(formValue);
    // console.log('create quiz data: ', formValue);
    this.submitQuiz.emit(formValue);
  }

  discard() {
    this.assessmentCreationService.closeQuizModals();
  }
}
