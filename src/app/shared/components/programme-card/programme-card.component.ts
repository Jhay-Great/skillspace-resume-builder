import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-programme-card',
  standalone: true,
  imports: [OverlayPanelModule, TagComponent],
  templateUrl: './programme-card.component.html',
  styleUrl: './programme-card.component.scss',
})
export class ProgrammeCardComponent {
  @Input() programme!: string;
  @Output() openApplyNowForm: EventEmitter<void> = new EventEmitter();

  // open form to apply
  applyNow() {
    this.openApplyNowForm.emit();
  }
}