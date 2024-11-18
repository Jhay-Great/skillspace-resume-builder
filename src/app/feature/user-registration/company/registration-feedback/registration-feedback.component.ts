import { Component, OnInit } from '@angular/core';
import { RegistrationFeedbackContentComponent } from '../registration-feedback-content/registration-feedback-content.component';

@Component({
  selector: 'app-registration-feedback',
  standalone: true,
  imports: [RegistrationFeedbackContentComponent],
  templateUrl: './registration-feedback.component.html',
  styleUrl: './registration-feedback.component.scss'
})
export class RegistrationFeedbackComponent implements OnInit {
  svgImage!:string;
  title!:string;
  description!:string;
  buttonText!:string;

  ngOnInit():void {
    this.getFeedbackResponse('success');
  }

  getFeedbackResponse (status:string) {
    switch(status) {
      case 'awaiting':
        this.handleAwaitingResponse();
        break;
      case 'rejected':
        this.handleRejectedResponse();
        break;
      case 'success':
        this.handleSuccessResponse();
        break;
      default: this.handleAwaitingResponse()
        break;
    }
    
  }

  private handleAwaitingResponse ():void {
    this.svgImage = 'review-awaiting';
    this.title = 'Your account is still under review'
    this.description = ' Your account will be reviewed by our System Administrator before activation. This process may take 1-3 business days. We will notify you via email once your account has been approved.';
    this.buttonText = 'Return to home page';
  }

  private handleRejectedResponse ():void {
    this.svgImage = 'review-rejected';
    this.title = 'Sorry, your account has been rejected'
    this.description = ' Your account was reviewed by our System Administrator (1-3 business days). We have notified you via email. Click ‘Sign up’ to restart the process.';
    this.buttonText = 'Sign up';
  }

  private handleSuccessResponse ():void {
    this.svgImage = 'review-successful';
    this.title = 'Congratulation!'
    this.description = ' Your account will be reviewed by our System Administrator before activation. This process may take 1-3 business days. We will notify you via email once your account has been approved.';
    this.buttonText = 'Continue to log in';
  }

}
