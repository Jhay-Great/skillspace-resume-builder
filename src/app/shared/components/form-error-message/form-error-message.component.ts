import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-error-message',
  standalone: true,
  imports: [],
  templateUrl: './form-error-message.component.html',
  styleUrl: './form-error-message.component.scss'
})
export class FormErrorMessageComponent {
  @Input () message:string | null = null;

}
