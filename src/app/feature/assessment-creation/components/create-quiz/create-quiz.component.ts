import { Component } from '@angular/core';
import { QuizFormComponent } from '../quiz-form/quiz-form.component';
import { AssessmentCreationService } from '../../services/assessment-creation/assessment-creation.service';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { take } from 'rxjs';

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

  onSubmit(formData: FormData) {
    if (!formData) return;

    this.assessmentCreationService
      .createQuiz(formData)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.toastService.showSuccess('Quiz created successfully', 'Success');
        },
        error: (err) => {
          this.toastService.showError(err.error.message, 'Error');
        },
      });
  }
}
