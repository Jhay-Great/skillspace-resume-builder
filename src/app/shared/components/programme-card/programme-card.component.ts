import { Component, EventEmitter, Input, Output } from '@angular/core';
// prime ng modules
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TagComponent } from '../tag/tag.component';
// programme interface
import { CompanyProgramme, Quiz } from '@src/app/core/interfaces/interfaces';
// programme application service
import { ProgrammeApplicationService } from '@src/app/feature/programme-application/programme-application-service/programme-application.service';

@Component({
  selector: 'app-programme-card',
  standalone: true,
  imports: [OverlayPanelModule, TagComponent],
  templateUrl: './programme-card.component.html',
  styleUrl: './programme-card.component.scss',
})
export class ProgrammeCardComponent {
  constructor(private programmeApplicationService: ProgrammeApplicationService) {}

  @Input() programme!: CompanyProgramme;
  @Output() openApplyNowForm: EventEmitter<void> = new EventEmitter();
  @Output() moveToSaved: EventEmitter<CompanyProgramme> = new EventEmitter();
  @Input() canMove: boolean = true ;
  @Output() viewProgramme: EventEmitter<CompanyProgramme> = new EventEmitter();

  // open form to apply
  applyNow() {
    this.programmeApplicationService.currentlyViewingProgramme = this.programme;
    this.openApplyNowForm.emit();
  }

  // view programme
  viewedProgramme(programme: CompanyProgramme) {
    this.viewProgramme.emit(programme);
  }

  // move programme to saved
  saveProgramme(programme: CompanyProgramme) {
    this.moveToSaved.emit(programme);
  }
  // formate date range
  formatDateRange(startDate: Date | string, endDate: Date | string): string {
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const startFormatted = start.toLocaleDateString('en-US', options);
    const endFormatted = end.toLocaleDateString('en-US', options);

    const year = start.getFullYear(); // Assuming both dates are in the same year
    return `${startFormatted} - ${endFormatted}, ${year}`;
  }
}
