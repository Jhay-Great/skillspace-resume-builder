import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-registration-feedback',
  standalone: true,
  imports: [],
  templateUrl: './registration-feedback-content.component.html',
  styleUrl: './registration-feedback-content.component.scss'
})
export class RegistrationFeedbackContentComponent {
  @Input() title:string | null = null;
  @Input() description:string | null = null;
  @Input() activeButton:boolean = true;
  @Input() buttonType: string | null = null;

}
