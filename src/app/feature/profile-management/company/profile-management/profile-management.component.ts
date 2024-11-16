import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

// primeng modules
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
// import { InputTextModule } from 'primeng/inputtext';

import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-profile-management',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    TabViewModule,
    ButtonModule,
  ],
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.scss',
})
export class ProfileManagementComponent {
  description:string = 'This is what applicants will see on your profile.'
}
