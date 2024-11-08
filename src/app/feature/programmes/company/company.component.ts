import { Component } from '@angular/core';
// import ng modules needed
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
// TabMenu
import { TabMenuModule } from 'primeng/tabmenu';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
// input Icon
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';

// http module
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    TabMenuModule,
    RippleModule,
    BadgeModule,
    InputIconModule,
    InputTextModule,
    IconFieldModule,
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent {
  users: any = [];
  items: any = [];
  activeItem: any;

  constructor(private http: HttpClient) {}

  getUsers() {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe((data: any) => {
        // console.log(data);
        this.users = data;
        console.log(this.users);
      });
  }

  ngOnInit() {
    this.getUsers();
    this.items = [
      { label: 'Skills quiz' },
      { label: 'Local repository' },
      { label: 'Global repository' },
    ];

    this.activeItem = this.items[0];
  }
}
