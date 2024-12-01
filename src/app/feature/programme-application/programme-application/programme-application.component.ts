import { Component } from '@angular/core';
import { ProgrammeCardComponent } from '@src/app/shared/components/programme-card/programme-card.component';

@Component({
  selector: 'app-programme-application',
  standalone: true,
  imports: [ProgrammeCardComponent],
  templateUrl: './programme-application.component.html',
  styleUrl: './programme-application.component.scss'
})
export class ProgrammeApplicationComponent {

}
  