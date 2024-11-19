import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Status } from '@core/interfaces/user-registration.interface';

@Component({
  selector: 'app-registration-feedback-content',
  standalone: true,
  imports: [],
  templateUrl: './registration-feedback-content.component.html',
  styleUrl: './registration-feedback-content.component.scss'
})
export class RegistrationFeedbackContentComponent {
  @Input() svgImage:string | null = null;
  @Input() title:string | null = null;
  @Input() description:string | null = null;
  @Input() buttonText: string | null = null;
  @Input() status!: Status;
  @Output () onNavigate: EventEmitter<string> = new EventEmitter;

  navigateTo() {
    if (this.status === 'REJECTED') {
      this.onNavigate.emit('/auth/company-registration')
    }
    else if (this.status === 'APPROVED') {
      this.onNavigate.emit('/auth/login');
    }else {
      this.onNavigate.emit('');

    }
  }

}
