import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AssessmentCreationService } from '../../services/assessment-creation/assessment-creation.service';
import {
  AssessmentCreationQuiz,
  CreateQuizData,
  createQuizOptions,
  createQuizQuestion,
} from '../../models/assessments.model';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-quiz-form',
  standalone: true,
  imports: [
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    InputSwitchModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.scss',
})
export class QuizFormComponent implements OnInit {
  quizForm: FormGroup;
  @Output() submitQuiz = new EventEmitter<CreateQuizData>();
  @Input() quizId!: number | null;

  constructor(
    private fb: FormBuilder,
    public assessmentCreationService: AssessmentCreationService,
    private toastService: ToastService
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
      options: this.fb.array([this.createOptionsFormGroup()]),
    });
  }

  ngOnInit(): void {
    if (this.quizId) {
      this.assessmentCreationService.getQuizById(this.quizId as number).subscribe({
        next: (quiz) => {
          this.patchFormWithQuizData(quiz);
        },
        error: () => {
          this.toastService.showError('Error', 'Error fetching Quiz');
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

  patchFormWithQuizData(quiz: AssessmentCreationQuiz): void {
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
    quiz.questions.forEach((question: createQuizQuestion) => {
      const questionGroup = this.fb.group({
        description: [question.description, Validators.required],
        points: [question.points, Validators.required],
        options: this.fb.array(
          question.options.map((option: createQuizOptions) =>
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

  addQuestion() {
    this.questions.push(this.createQuestionFormGroup());
  }

  cloneQuestion(questionIndex: number) {
    console.log('about to clone quiz');
    const questionToClone = this.questions.at(questionIndex) as FormGroup;
    const clonedQuestion = this.fb.group({
      description: [questionToClone.get('description')?.value, Validators.required],
      points: [questionToClone.get('points')?.value, Validators.required],
      options: this.fb.array(
        questionToClone.get('options')?.value.map((option: { text: string; isCorrect: boolean }) =>
          this.fb.group({
            text: [option.text, Validators.required],
            isCorrect: [option.isCorrect],
          })
        )
      ),
    });
    this.questions.push(clonedQuestion);
  }

  addOption(questionIndex: number) {
    const questionFormGroup = this.questions.at(questionIndex) as FormGroup;
    const optionsFormArray = questionFormGroup.get('options') as FormArray;
    optionsFormArray.push(this.createOptionsFormGroup());
  }

  removeQuestion(index: number) {
    if (this.questions.length > 1) {
      this.questions.removeAt(index);
    }
  }

  removeOption(questionIndex: number, optionIndex: number) {
    const optionsFormArray = this.questions.controls[questionIndex].get('options') as FormArray;
    optionsFormArray.removeAt(optionIndex);
  }

  onQuizSubmit() {
    const formValue = { ...this.quizForm.value };

    // Convert string values to numbers
    formValue.passMark = Number(formValue.passMark);
    formValue.retakeOption = Number(formValue.retakeOption);
    formValue.duration = Number(formValue.duration);

    // Convert points to numbers for each question
    formValue.questions = formValue.questions.map((question: createQuizQuestion) => ({
      ...question,
      points: Number(question.points),
    }));
    this.submitQuiz.emit(formValue);
  }

  discard() {
    this.assessmentCreationService.closeQuizModals();
  }
}
