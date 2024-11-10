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
  mockProgrammes: any = [
    {
      name: 'Graduate Trainee Frontend',
      description: 'This programme is built for everyone',
      start: '4th June 2023',
      end: '4th June 2024',
      status: 'Draft',
    },
    {
      name: 'Graduate Trainee Frontend',
      description: 'This programme is built for everyone',
      start: '4th June 2023',
      end: '4th June 2024',
      status: 'Draft',
    },
    {
      name: 'Graduate Trainee Frontend',
      description: 'This programme is built for everyone',
      start: '4th June 2023',
      end: '4th June 2024',
      status: 'Draft',
    },
    {
      name: 'Graduate Trainee Frontend',
      description: 'This programme is built for everyone',
      start: '4th June 2023',
      end: '4th June 2024',
      status: 'Draft',
    },
  ];
  tabMenuList: any = [];
  activeItem: any;
  activeTabData = 0;

  mockdraft: any = [
    {
      name: 'Graduate Trainee Frontend',
      description: 'This programme is built for everyone',
      start: '4th June 2023',
      end: '4th June 2024',
      status: 'Draft',
    },
    {
      name: 'Data Science',
      description: 'This programme is built for everyone',
      start: '4th June 2023',
      end: '4th June 2024',
      status: 'Draft',
    },
    {
      name: 'Graduate Trainee Frontend',
      description: 'This programme is built for everyone',
      start: '4th June 2023',
      end: '4th June 2024',
      status: 'Draft',
    },
  ];
  // tabMenu
  careerProgrammes = true;
  savedDraft = false;
  publishedProgrammes = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
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
    this.activeTabData = 0;
  }

  setSavedDraftTab() {
    this.resetTab();
    this.savedDraft = true;
    this.activeTabData = 1;
  }

  setPublishedProgrammesTab() {
    this.resetTab();
    this.publishedProgrammes = true;
    this.activeTabData = 2;
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
