import { Component, EventEmitter, Output } from '@angular/core';
// import componenents
import { TagComponent } from '@src/app/shared/components/tag/tag.component';
// import service
import { ProgrammeApplicationService } from '../programme-application-service/programme-application.service';

@Component({
  selector: 'app-viewed-programme',
  standalone: true,
  imports: [TagComponent],
  templateUrl: './viewed-programme.component.html',
  styleUrl: './viewed-programme.component.scss',
})
export class ViewedProgrammeComponent {
  constructor(public programmeApplicationService: ProgrammeApplicationService) {}
  @Output() openApplyNowForm: EventEmitter<string> = new EventEmitter();

  applyNow() {
    this.openApplyNowForm.emit();
  }

  // format date range
  formatDateRange(start: string | Date, end: string | Date): string {
    // Convert input to Date if it's a string
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Format the date into "Month Day, Year" format
    const formatDate = (date: Date): string => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };

    // Calculate the number of weeks between start and end date
    const timeDiff = endDate.getTime() - startDate.getTime();
    const weeks = Math.floor(timeDiff / (1000 * 3600 * 24 * 7));

    // Format the dates and return the result
    return `${formatDate(startDate)} - ${formatDate(endDate)} (${weeks} weeks)`;
  }

  // days left to apply
  daysLeftToApply(target: string | Date): string {
    // Convert input to Date if it's a string
    const targetDate = new Date(target);
    const currentDate = new Date();
  
    // Calculate the difference in days
    const timeDiff = targetDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); // rounding up for days
  
    // Format the target date into "Month Day, Year"
    const formatDate = (date: Date): string => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };
  
    // Return the formatted result
    return `${daysLeft} Days Left to Apply (${formatDate(targetDate)})`;
  }
}
