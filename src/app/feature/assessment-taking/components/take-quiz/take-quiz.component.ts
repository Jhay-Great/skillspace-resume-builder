import { Component, Input, OnInit } from '@angular/core';
import { AssessmentTakingService } from '../../services/assessment-taking/assessment-taking.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AssessmentTakingQuiz,  UserResponse } from '../../models/quiz-taking.model';
import { Observable, tap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-take-quiz',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, RadioButtonModule, ButtonModule, CommonModule],
  templateUrl: './take-quiz.component.html',
  styleUrl: './take-quiz.component.scss',
})
export class TakeQuizComponent implements OnInit {
  @Input() quizId: number | null = null;
  quizForm!: FormGroup;
  quiz$!: Observable<AssessmentTakingQuiz | undefined>;
  quiz!: AssessmentTakingQuiz;

  constructor(
    private assessmentTakingService: AssessmentTakingService,
    private fb: FormBuilder
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
        actualQuizId: this.quiz.id,
        solvedQuestions: this.quiz.questions.map((question) => ({
          actualQuestionId: question.id,
          answerId: this.quizForm.get(`question_${question.id}`)?.value,
        })),
      };

      // console.log('user response: ', userResponse);

      
      
      // send response to backend.
      this.assessmentTakingService.submitQuiz(userResponse).subscribe({
        next: (res) => {
          // show quiz results
          
          // close quiz
          this.assessmentTakingService.closeTakeQuiz();
        }
      })
    }
  }
}
