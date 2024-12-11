import { Component } from '@angular/core';
// components
import { ApplicationCardComponent } from '../application-card/application-card.component';
// primeNg modules
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-all-applications',
  standalone: true,
  imports: [
    IconFieldModule,
    InputIconModule,
    SplitButtonModule,
    InputTextModule,
    TableModule,
    ApplicationCardComponent,
  ],
  templateUrl: './all-applications.component.html',
  styleUrl: './all-applications.component.scss',
})
export class AllApplicationsComponent {
  constructor() {
    this.status = [
      {
        label: 'Available',
        command: () => {},
      },
      {
        label: 'Coming Soon',
        command: () => {},
      },
      { label: 'Closed', url: 'http://angular.io' },
    ];

    this.testData = [
      { title: 'Software Engineering Internship', company: 'Company 1' },
      { title: 'Javascript Internship', company: 'Company 2' },
      { title: 'Software Engineering Internship', company: 'Company 3' },
      { title: 'Software Engineering Internship', company: 'Company 4' },
      { title: 'Cyber Security', company: 'Company 5' },
      { title: 'Cloud Engineering', company: 'Company 6' },
      { title: 'Forex Trading Training', company: 'Company 7' },
      { title: 'AWS Internship', company: 'Company 8' },
    ];
  }

  status: MenuItem[] = [];
  testData: { title: string; company: string }[] = [];
}
