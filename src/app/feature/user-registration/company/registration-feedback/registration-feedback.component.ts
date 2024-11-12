import { Component } from '@angular/core';
import { RegistrationFeedbackContentComponent } from '../registration-feedback-content/registration-feedback-content.component';

@Component({
  selector: 'app-registration-feedback',
  standalone: true,
  imports: [RegistrationFeedbackContentComponent],
  templateUrl: './registration-feedback.component.html',
  styleUrl: './registration-feedback.component.scss'
})
export class RegistrationFeedbackComponent {
  isAwaitingReview:boolean = false;
  isRejected:boolean = false;
  isSuccessful:boolean = false;

}
