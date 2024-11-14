import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import primeng modules needed
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
// import career creation form component
import { CareerCreationFormComponent } from '../career-creation-form/career-creation-form.component';
// import interface
import { TabMenuList } from '../../../core/interfaces/interfaces';
import { ButtonModule } from 'primeng/button';

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
    CareerCreationFormComponent,
    OverlayPanelModule,
    DialogModule,
    ButtonModule,
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
  tabMenuList: TabMenuList[] = [];
  activeItem!: TabMenuList;
  activeTabData = 0;

  // form modal
  formModal = false;
  // delete modal
  deleteModal = false;
  // move to draft modal
  moveToDraftModal = false;

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

  ngOnInit() {
    this.tabMenuList = [
      { label: 'Career programmes' },
      { label: 'Saved drafts' },
      { label: 'Published programmes' },
    ];

    this.activeItem = this.tabMenuList[0];
  }

  // TabMenu control function
  private setCareerProgrammesTab() {
    this.resetTab();
    this.careerProgrammes = true;
    this.activeTabData = 0;
  }

  private setSavedDraftTab() {
    this.resetTab();
    this.savedDraft = true;
    this.activeTabData = 1;
  }

  private setPublishedProgrammesTab() {
    this.resetTab();
    this.publishedProgrammes = true;
    this.activeTabData = 2;
  }

  private resetTab() {
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

  // Modals Functionalities
  visible: boolean = false;
  showDialog() {
    this.visible = true;
  }
  // confirmation modal
  confirmModal(type: string) {
    if (type === 'delete') {
      this.moveToDraftModal = false;
      this.deleteModal = true;
      this.showDialog();
    }
    if (type === 'moveToDraft') {
      this.deleteModal = false;
      this.moveToDraftModal = true;
      this.showDialog();
    }
  }
  // open form
  openForm() {
    this.formModal = true;
  }
  // close form
  closeForm() {
    this.formModal = false;
  }
}
