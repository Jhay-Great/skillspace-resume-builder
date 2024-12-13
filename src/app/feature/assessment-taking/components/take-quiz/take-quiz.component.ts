import { Component, Input, OnInit } from '@angular/core';
import { AssessmentTakingService } from '../../services/assessment-taking/assessment-taking.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Question, QuizToTake } from '../../models/quiz-taking.model';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-take-quiz',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, RadioButtonModule, ButtonModule],
  templateUrl: './take-quiz.component.html',
  styleUrl: './take-quiz.component.scss',
})
export class TakeQuizComponent implements OnInit {
  @Input() quizId: number | null = null;
  quizForm!: FormGroup;
  quiz$!: Observable<QuizToTake | undefined>;
  quiz!: QuizToTake;

  constructor(
    private assessmentTakingService: AssessmentTakingService,
    private fb: FormBuilder
  ) {
    // if (this.quizId) {
    //   this.quiz$ = assessmentTakingService.getQuiz(this.quizId);
    // }
    this.quiz$ = assessmentTakingService.getQuiz(this.quizId);
  }

  ngOnInit() {
    this.quizForm = this.fb.group({
      questions: this.fb.array([]),
    });

    this.quiz$ = this.assessmentTakingService.getQuiz(this.quizId).pipe(
      tap((quiz) => {
        if (quiz) {
          this.initializeQuizForm(quiz);
        }
      })
    );
  }

  private initializeQuizForm(quiz: QuizToTake) {
    const questionsArray = this.quizForm.get('questions') as FormArray;
    questionsArray.clear(); // Clear existing form controls

    quiz.questions.forEach((question) => {
      questionsArray.push(this.createQuestionForm(question));
    });
  }

  createQuestionForm(question: Question): FormGroup {
    return this.fb.group({
      [`selectedOption-${question.id}`]: [null],
      questionId: [question.id],
      text: [question.description],
    });
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  submitQuiz() {
    if (this.quizForm.valid) {
      // console.log(this.quizForm.value);
      // Implement your submission logic here
    }
  }
}
