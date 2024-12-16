import { Component } from '@angular/core';
import { QuizFormComponent } from '../quiz-form/quiz-form.component';
import { AssessmentCreationService } from '../../services/assessment-creation/assessment-creation.service';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { take } from 'rxjs';
import { CreateQuizData } from '../../models/assessments.model';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [QuizFormComponent],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.scss',
})
export class CreateQuizComponent {
  constructor(
    private assessmentCreationService: AssessmentCreationService,
    private toastService: ToastService
  ) {}

  onSubmit(quizData: CreateQuizData) {
    if (!quizData) return;

    this.assessmentCreationService
      .createQuiz(quizData)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.toastService.showSuccess('Quiz created successfully', 'Success');
          this.assessmentCreationService.closeQuizModals();
        },
        error: (err) => {
          this.toastService.showError(err.error.message, 'Error');
        },
      });
  }
}
