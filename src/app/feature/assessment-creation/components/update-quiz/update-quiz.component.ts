import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { QuizFormComponent } from '../quiz-form/quiz-form.component';
import { AssessmentCreationService } from '../../services/assessment-creation/assessment-creation.service';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { Subscription } from 'rxjs';

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

  onSubmit(formData: FormData) {
    // if (this.quizId) {
    //   this.assessmentCreationService.updateQuiz(formData, this.quizId).subscribe({
    //     next: () => {
    //       this.toastService.showSuccess('Quiz updated successfully', 'Success');
    //     },
    //     error: (err) => {
    //       this.toastService.showError(err.error.message, 'Error');
    //     },
    //   });
    // }
  }

  ngOnInit() {
    if (this.quizId) {
      // fetch the quiz by its id and pass it to the form
    }
  }


}
