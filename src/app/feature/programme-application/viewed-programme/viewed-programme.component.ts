import { Component, EventEmitter, Output } from '@angular/core';
// import componenents
import { TagComponent } from '@src/app/shared/components/tag/tag.component';

@Component({
  selector: 'app-viewed-programme',
  standalone: true,
  imports: [TagComponent],
  templateUrl: './viewed-programme.component.html',
  styleUrl: './viewed-programme.component.scss',
})
export class ViewedProgrammeComponent {
  @Output() onApplyNow: EventEmitter<string> = new EventEmitter();

  applyNow() {
    this.onApplyNow.emit();
  }
}
