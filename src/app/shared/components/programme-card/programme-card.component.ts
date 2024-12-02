import { Component, Input } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-programme-card',
  standalone: true,
  imports: [OverlayPanelModule],
  templateUrl: './programme-card.component.html',
  styleUrl: './programme-card.component.scss',
})
export class ProgrammeCardComponent {
  @Input() programme!: string;
}
