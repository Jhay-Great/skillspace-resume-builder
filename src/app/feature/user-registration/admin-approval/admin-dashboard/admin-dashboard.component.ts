import { Component } from '@angular/core';
import { IApplicantData } from '@src/app/core/interfaces/user-registration.interface';

// primeng modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [TableModule, ButtonModule, TagModule, AvatarModule,  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  applicants:IApplicantData[] = [
    {name: 'amalitech', email: 'ama@gmail.com', status: 'pending', date: '12/03/24'},
    {name: 'hubtel', email: 'hbt@gmail.com', status: 'approved', date: '12/11/24', image: 'assets/images/Avatar.png'},
  ];


  getSeverity(status: string) {
    if (status === 'approved') return 'success';
    if (status === 'rejected') return 'danger';
    else return 'info'
  }

}
