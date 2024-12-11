import { Component, Input } from '@angular/core';
// import components
import { TagComponent } from '@src/app/shared/components/tag/tag.component';

@Component({
  selector: 'app-application-card',
  standalone: true,
  imports: [TagComponent],
  templateUrl: './application-card.component.html',
  styleUrl: './application-card.component.scss',
})
export class ApplicationCardComponent {
  @Input() application!: { title: string; company: string };


  // random number
randomNum = Math.random() ;
}
