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
  @Input() severity: 'danger' | 'success' | 'warning' | null = null;


  getSeverityClass(): string {
    switch (this.severity) {
      case 'danger':
        console.log('danger was called...')
        return 'danger-class';
        case 'success':
        console.log('danger was called...')
        return 'success-class';
        case 'warning':
        console.log('danger was called...')
        return 'warning-class';
      default:
        return '';
    }
  }
  
  
}
