import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '@src/app/core/pipes/capitalize/capitalize.pipe';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule, CapitalizePipe, ],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {
  @Input() status: string | null = null;

  private getSeverityMap(): Record<string, string> {
    return {
      // red status tag
      'rejected': 'danger-class',
      'failed': 'danger-class',
      'closed': 'danger-class',
      
      // blue status tag
      'pending': 'warning-class',
      'published': 'warning-class',
      'under review': 'warning-class',
      
      // green status tag
      'approved': 'success-class',
      'shortlisted': 'success-class',
      'draft': 'success-class',
      'graded': 'success-class',
      'available': 'success-class',
      'passed': 'success-class',
      'interview scheduled': 'success-class',
      'successful': 'success-class',
    };
  }


  getSeverityClass(): string {
    if (!this.status) return 'warning-class';

    const lowercaseStatus = this.status.toLowerCase();
    const severityMap = this.getSeverityMap();
    return severityMap[lowercaseStatus] || 'warning-class';
  }
  
}
