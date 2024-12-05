import { Component } from '@angular/core';

@Component({
  selector: 'app-no-data-found',
  standalone: true,
  imports: [],
  templateUrl: './no-data-found.component.html',
  styleUrl: './no-data-found.component.scss'
})
export class NoDataFoundComponent {
  description: string = 'You will see all data here when you add one.'
}
