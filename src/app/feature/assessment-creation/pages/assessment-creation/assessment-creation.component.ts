import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { TabMenuList } from '@src/app/core/interfaces/interfaces';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { Quiz } from '../../models/assessments.model';
import { ExtendedConfirmation } from '@src/app/core/interfaces/confirmation.interface';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { TieredMenu, TieredMenuModule } from 'primeng/tieredmenu';
import { TabViewModule } from 'primeng/tabview';
import { CreateQuizComponent } from '../../components/create-quiz/create-quiz.component';
import { UpdateQuizComponent } from '../../components/update-quiz/update-quiz.component';
import { AssessmentCreationService } from '../../services/assessment-creation/assessment-creation.service';

@Component({
  selector: 'app-assessment-creation',
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
    TieredMenuModule,
    OverlayPanelModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
    TabViewModule,
    CreateQuizComponent,
    UpdateQuizComponent,
  ],
  templateUrl: './assessment-creation.component.html',
  styleUrl: './assessment-creation.component.scss',
})
export class AssessmentCreationComponent implements OnInit {
  tabMenuList: TabMenuList[] = [];
  activeItem!: TabMenuList;
  activeTabData = 0;
  // tabMenu
  skillsQuiz = true;
  localRepository = false;
  globalRepository = false;
  tieredMenuItems: MenuItem[] | undefined;
  selectedQuiz: Quiz | null = null;

  @ViewChild('tieredMenu') tieredMenu!: TieredMenu;

  skillsQuizData: Quiz[] = [
    {
      id: 1,
      name: 'UI/UX Design Quiz 1',
      location: 'Local repository',
      duration: '10 minutes',
      passMark: '50%',
      dateCreated: '4th June 2023',
    },
    {
      id: 2,
      name: 'UI/UX Design Quiz 2',
      location: 'Global repository',
      duration: '10 minutes',
      passMark: '50%',
      dateCreated: '4th June 2023',
    },
    {
      id: 3,
      name: 'Frontend Quiz 1',
      location: 'Local repository',
      duration: '10 minutes',
      passMark: '50%',
      dateCreated: '4th June 2023',
    },
  ];

  localRepositoryData: Quiz[] = [
    {
      id: 1,
      name: 'UI/UX Design Quiz 1',
      location: 'Local repository',
      duration: '10 minutes',
      passMark: '50%',
      dateCreated: '4th June 2023',
    },
    {
      id: 2,
      name: 'UI/UX Design Quiz 2',
      location: 'Global repository',
      duration: '10 minutes',
      passMark: '50%',
      dateCreated: '4th June 2023',
    },
    {
      id: 3,
      name: 'Frontend Quiz 1',
      location: 'Local repository',
      duration: '10 minutes',
      passMark: '50%',
      dateCreated: '4th June 2023',
    },
  ];
  globalRepositoryData: Quiz[] = [
    {
      id: 1,
      name: 'UI/UX Design Quiz 1',
      location: 'Local repository',
      duration: '10 minutes',
      passMark: '50%',
      dateCreated: '4th June 2023',
    },
    {
      id: 2,
      name: 'UI/UX Design Quiz 2',
      location: 'Global repository',
      duration: '10 minutes',
      passMark: '50%',
      dateCreated: '4th June 2023',
    },
  ];

  constructor(
    private confirmationService: ConfirmationService,
    public assessmentCreationService: AssessmentCreationService
  ) {}

  ngOnInit() {
    this.tabMenuList = [{ label: 'Skills quiz' }, { label: 'Local repository' }, { label: 'Global repository' }];
    this.activeItem = this.tabMenuList[0];

    this.tieredMenuItems = [
      {
        label: 'Move',
        icon: 'pi pi-folder-open',
        items: [
          {
            label: 'Global Repository',
            icon: 'pi pi-globe',
            command: () => {
              this.confirmMoveModal('Global Repository');
            },
          },
          {
            label: 'Local Repository',
            icon: 'pi pi-desktop',
            command: () => {
              this.confirmMoveModal('Local Repository');
            },
          },
        ],
      },
      {
        label: 'Update',
        icon: 'pi pi-pencil',
        command: () => {
          this.showUpdateQuizModal();
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          this.confirmDeleteModal(this.selectedQuiz as Quiz);
        },
      },
    ];
  }

  // TabMenu control function
  private setSkillsQuizTab() {
    this.resetTab();
    this.skillsQuiz = true;
    this.activeTabData = 0;
  }

  private setLocalRepositoryTab() {
    this.resetTab();
    this.localRepository = true;
    this.activeTabData = 1;
  }

  private setGlobalRepositoryTab() {
    this.resetTab();
    this.globalRepository = true;
    this.activeTabData = 2;
  }

  private resetTab() {
    this.skillsQuiz = false;
    this.localRepository = false;
    this.globalRepository = false;
  }

  setActiveTab(title: string) {
    this.assessmentCreationService.closeQuizModals();
    switch (title) {
      case 'Skills quiz':
        this.setSkillsQuizTab();
        break;
      case 'Local repository':
        this.setLocalRepositoryTab();
        break;
      case 'Global repository':
        this.setGlobalRepositoryTab();
        break;
      default:
        break;
    }
  }

  getActiveTabData() {
    switch (this.activeTabData) {
      case 0:
        return this.skillsQuizData;
      case 1:
        return this.localRepositoryData;
      case 2:
        return this.globalRepositoryData;
      default:
        return this.skillsQuizData;
    }
  }

  showCreateQuizModal() {
    this.assessmentCreationService.showCreateQuizModal();
  }

  showUpdateQuizModal() {
    this.assessmentCreationService.showUpdateQuizModal();
  }

  openTieredMenu(event: Event, quiz: Quiz) {
    this.selectedQuiz = quiz;
    this.tieredMenu.toggle(event);
  }

  // confirmation modals
  confirmMoveModal(type: string) {
    this.confirmationService.confirm({
      header: 'Move skills quiz',
      message: `Are you sure you want to move skills quiz to ${type} repository?`,
      acceptSeverity: 'primary',
      rejectSeverity: 'secondary',
      acceptLabel: 'Move',
      rejectLabel: 'Cancel',
      accept: () => {
        // if the type is global repository, move to global repository
        if (type === 'Global Repository') {
          // make a request to move to global repository
          alert(`Moving ${this.selectedQuiz?.name} to Global Repository`);
        } else {
          // make a request to move to local repository
          alert(`Moving ${this.selectedQuiz?.name} to Local Repository`);
        }
      },
      reject: () => {
        return null;
      },
    } as ExtendedConfirmation);
  }

  confirmDeleteModal(item: Quiz) {
    this.confirmationService.confirm({
      header: 'Delete skills quiz',
      message: `Are you sure you want to delete ${item.name}? This action cannot be reversed.`,
      acceptSeverity: 'danger',
      rejectSeverity: 'secondary',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      accept: () => {
        // make a request to delete the item
        return null;
      },
      reject: () => {
        return null;
      },
    } as ExtendedConfirmation);
  }
}
