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
  tabMenuList: any = [];
  activeItem: any;
  activeTabData = 0

  draft: any = [
    { name: 'draft Mary', username: 'another one' },
    { name: 'draft John', username: 'another one' },
    { name: 'draft Agnes', username: 'another one' },
    { name: 'Draft Mavis', username: 'another one' },
    { name: 'Draft Doe', username: 'another one' },
    { name: 'Draft Crentsil', username: 'another one' },
    { name: 'Draft Jane', username: 'another one' },
    { name: 'Draft John', username: 'another one' },
    { name: 'Draft Nancy', username: 'another one' },
    { name: 'Draft Doris', username: 'another one' },
  ];
  // tabMenu
  careerProgrammes = true;
  savedDraft = false;
  publishedProgrammes = false;

  constructor(private http: HttpClient) {}

  getUsers() {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe((data: any) => {
        // console.log(data);
        this.users = data;
      });
  }

  ngOnInit() {
    this.getUsers();
    this.tabMenuList = [
      { label: 'Career programmes' },
      { label: 'Saved drafts' },
      { label: 'Published programmes' },
    ];

    this.activeItem = this.tabMenuList[0];
  }

  // TabMenu control function
  setCareerProgrammesTab() {
    this.resetTab();
    this.careerProgrammes = true;
    this.activeTabData = 0
  }

  setSavedDraftTab() {
    this.resetTab();
    this.savedDraft = true;
    this.activeTabData = 1
  }

  setPublishedProgrammesTab() {
    this.resetTab();
    this.publishedProgrammes = true;
    this.activeTabData = 2
  }

  resetTab() {
    this.careerProgrammes = false;
    this.savedDraft = false;
    this.publishedProgrammes = false;
  }
  
  setActiveTab(title: string) {
    switch (title) {
      case 'Career programmes':
        this.setCareerProgrammesTab();
        break;
      case 'Saved drafts':
        this.setSavedDraftTab();
        break;
      case 'Published programmes':
        this.setPublishedProgrammesTab();
        break;
      default:
        break;
    }
  }
}
