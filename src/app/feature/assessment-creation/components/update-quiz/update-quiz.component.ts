import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { QuizFormComponent } from '../quiz-form/quiz-form.component';
import { AssessmentCreationService } from '../../services/assessment-creation/assessment-creation.service';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { Subscription } from 'rxjs';
import { CreateQuizData } from '../../models/assessments.model';

@Component({
  selector: 'app-update-quiz',
  standalone: true,
  imports: [QuizFormComponent],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.scss',
})
export class UpdateQuizComponent implements OnInit {
  @Input() quizId: number | null = null;

  constructor(
    private assessmentCreationService: AssessmentCreationService,
    private toastService: ToastService
  ) {}

  onSubmit(quizData: CreateQuizData) {
    if (quizData) {
      console.log('quiz data for update: ', quizData);
      this.assessmentCreationService.updateQuiz(quizData, this.quizId as number).subscribe({
        next: (res) => {
          console.log('response from update quiz: ', res);
          this.toastService.showSuccess('Success', 'Quiz updated Successfully.');
          this.assessmentCreationService.updateQuizVisible.set(false)
        },
        error: (err) => {
          console.log("error from quiz update: ", err)
          this.toastService.showError('Error', 'Quiz update Error');
        },
      });
    }
  }

  ngOnInit() {
    if (this.quizId) {
      // fetch the quiz by its id and pass it to the form
    }
  }
}
