import { Component, Input } from '@angular/core';
import { QuizFormComponent } from '../quiz-form/quiz-form.component';
import { AssessmentCreationService } from '../../services/assessment-creation/assessment-creation.service';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { CreateQuizData } from '../../models/assessments.model';

@Component({
  selector: 'app-update-quiz',
  standalone: true,
  imports: [QuizFormComponent],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.scss',
})
export class UpdateQuizComponent {
  @Input() quizId: number | null = null;

  constructor(
    private assessmentCreationService: AssessmentCreationService,
    private toastService: ToastService
  ) {}

  onSubmit(quizData: CreateQuizData) {
    if (quizData) {
      this.assessmentCreationService.updateQuiz(quizData, this.quizId as number).subscribe({
        next: () => {
          this.toastService.showSuccess('Success', 'Quiz updated Successfully.');
          this.assessmentCreationService.updateQuizVisible.set(false)
        },
        error: () => {
          this.toastService.showError('Error', 'Quiz update Error');
        },
      });
    }
  }
}
