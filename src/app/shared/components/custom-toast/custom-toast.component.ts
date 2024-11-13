import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-toast',
  standalone: true,
  imports: [],
  templateUrl: './custom-toast.component.html',
  styleUrl: './custom-toast.component.scss',
})
export class CustomToastComponent {
  @Input() severity!: string;
  @Input() detail!: string;
  @Input() summary!: string; 

  ngOnInit() {
    this.getToastType;
  }

  getToastType() {
    if (this.severity === 'error-toast') {
      return 'error-toast';
    } else if (this.severity === 'success-toast') {
      return 'success-toast';
    }
    return 'warning-toast';
  }


  getToastIcon() { 
    if (this.severity === 'error-toast') {
      return 'pi-info-circle';
    } else if (this.severity === 'success-toast') {
      return 'pi-check-circle';
    }
    return 'pi-info-circle';
  }
}
