import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header-description',
  standalone: true,
  imports: [],
  templateUrl: './page-header-description.component.html',
  styleUrl: './page-header-description.component.scss'
})
export class PageHeaderDescriptionComponent {
  @Input() title:string | null = null;
  @Input() description:string | null = null;
}
