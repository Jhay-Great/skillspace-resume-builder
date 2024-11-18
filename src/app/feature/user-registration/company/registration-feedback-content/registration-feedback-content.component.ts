import { Component, Input } from '@angular/core';

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

}
