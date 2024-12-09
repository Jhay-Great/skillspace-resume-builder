import { Component, OnDestroy } from '@angular/core';
import { QuizFormComponent } from '../quiz-form/quiz-form.component';
import { AssessmentCreationService } from '../../services/assessment-creation/assessment-creation.service';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [QuizFormComponent],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.scss',
})
export class CreateQuizComponent implements OnDestroy {
  private subscriptions!: Subscription;
  constructor(
    private assessmentCreationService: AssessmentCreationService,
    private toastService: ToastService
  ) {}

  onSubmit(formData: FormData) {
    if (!formData) return;

    this.subscriptions = this.assessmentCreationService.createQuiz(formData).subscribe({
      next: () => {
        this.toastService.showSuccess('Quiz created successfully', 'Success');
      },
      error: (err) => {
        this.toastService.showError(err.error.message, 'Error');
      },
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
