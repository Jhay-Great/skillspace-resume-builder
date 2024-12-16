import { Component, Input, OnInit } from '@angular/core';
import { AssessmentTakingService } from '../../services/assessment-taking/assessment-taking.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AssessmentTakingQuiz, TakeQuizError, UserResponse } from '../../models/quiz-taking.model';
import { Observable, tap } from 'rxjs';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';

@Component({
  selector: 'app-take-quiz',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    RadioButtonModule,
    ButtonModule,
    CommonModule,
    ProgressSpinnerModule,
  ],
  providers: [DatePipe],
  templateUrl: './take-quiz.component.html',
  styleUrl: './take-quiz.component.scss',
})
export class TakeQuizComponent implements OnInit {
  @Input() quizId: number | null = null;
  quizForm!: FormGroup;
  quiz$!: Observable<AssessmentTakingQuiz | undefined>;
  quiz!: AssessmentTakingQuiz;

  constructor(
    public assessmentTakingService: AssessmentTakingService,
    private toastService: ToastService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.quiz$ = assessmentTakingService.getQuiz(this.quizId as number);
  }

  ngOnInit() {
    this.quiz$ = this.assessmentTakingService.getQuiz(this.quizId as number).pipe(
      tap((quiz) => {
        if (quiz) {
          this.quiz = quiz;
          this.initializeQuizForm(quiz);
        }
      })
    );
  }

  private initializeQuizForm(quiz: AssessmentTakingQuiz) {
    const formControls: { [key: string]: FormControl<string | null> } = {};

    quiz.questions.forEach((question) => {
      formControls[`question_${question.id}`] = this.fb.control('');
    });

    this.quizForm = this.fb.group(formControls);
  }

  get questions() {
    return this.quizForm.get('questions');
  }

  isQuizFullyAnswered(): boolean {
    return this.quiz.questions.every((question) => this.quizForm.get(`question_${question.id}`)?.value !== '');
  }

  submitQuiz() {
    if (this.isQuizFullyAnswered()) {
      const userResponse: UserResponse = {
        id: null,
        actualQuizId: this.quiz.id,
        solvedQuestions: this.quiz.questions.map((question) => ({
          actualQuestionId: question.id,
          answerId: this.quizForm.get(`question_${question.id}`)?.value,
        })),
      };


      // send response to backend.
      this.assessmentTakingService.submitQuiz(userResponse).subscribe({
        next: (res) => {
          // show quiz results
          if (res.status === 'SUCCESSFUL') {
            this.toastService.showSuccess(
              "Congratulations!, You've Earned a badge",
              `You had a percentage score of ${res.percentageScore}%`
            );
          } else {
            this.toastService.showError(
              "Sorry, you didn't meet the pass mark",
              `You can retry this quiz after ${this.datePipe.transform(res.retryDate, 'dd/MM/yyyy')}`
            );
          }

          // close quiz
          this.assessmentTakingService.closeTakeQuiz();
        },
      });
    }
  }
}
