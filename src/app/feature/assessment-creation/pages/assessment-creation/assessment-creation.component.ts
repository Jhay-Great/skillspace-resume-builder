import { CommonModule, DatePipe } from '@angular/common';
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
import { Table, TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { Quiz } from '../../models/assessments.model';
import { ExtendedConfirmation } from '@src/app/core/interfaces/confirmation.interface';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { TieredMenu, TieredMenuModule } from 'primeng/tieredmenu';
import { TabViewModule } from 'primeng/tabview';
import { CreateQuizComponent } from '../../components/create-quiz/create-quiz.component';
import { UpdateQuizComponent } from '../../components/update-quiz/update-quiz.component';
import { AssessmentCreationService } from '../../services/assessment-creation/assessment-creation.service';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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
    DatePipe,
    ProgressSpinnerModule,
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
  @ViewChild('dt1') dt1!: Table;

  constructor(
    private confirmationService: ConfirmationService,
    public assessmentCreationService: AssessmentCreationService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.tabMenuList = [{ label: 'Skills quiz' }, { label: 'Local repository' }, { label: 'Global repository' }];
    this.activeItem = this.tabMenuList[0];

    this.assessmentCreationService.getAllQuizzes().subscribe();
    this.assessmentCreationService
      .getQuizzesByLocation({
        location: 'local',
        page: 0,
        size: 10,
      })
      .subscribe();
    this.assessmentCreationService
      .getQuizzesByLocation({
        location: 'global',
        page: 0,
        size: 10,
      })
      .subscribe();

    console.log('skills quiz data: ', this.assessmentCreationService.skillsQuizData());
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
        return this.assessmentCreationService.skillsQuizData();
      case 1:
        return this.assessmentCreationService.localRepositoryData();
      case 2:
        return this.assessmentCreationService.globalRepositoryData();
      default:
        return this.assessmentCreationService.skillsQuizData();
    }
  }

  getActiveTabLoadingState() {
    switch (this.activeTabData) {
      case 0:
        return this.assessmentCreationService.isSkillsQiuzLoading();
      case 1:
        return this.assessmentCreationService.isLocalRepositoryLoading();
      case 2:
        return this.assessmentCreationService.isGlobalRepositoryLoading();
      default:
        return this.assessmentCreationService.isSkillsQiuzLoading();
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

          this.assessmentCreationService.changeLocation(this.selectedQuiz?.id as number, 'global').subscribe({
            next: (res) => {
              console.log('response from move to global: ', res);
              this.toastService.showSuccess('Success', `${this.selectedQuiz?.name} moved to Global Repository`);
            },
            error: (err) => {
              console.log('error from move to global: ', err);
              this.toastService.showError('Error', err.error.message);
            },
          });
        } else {
          // make a request to move to local repository
          this.assessmentCreationService.changeLocation(this.selectedQuiz?.id as number, 'local').subscribe({
            next: (res) => {
              console.log('response from move to global: ', res);
              this.toastService.showSuccess('Success', `${this.selectedQuiz?.name} moved to Local Repository`);
            },
            error: (err) => {
              console.log('error from move to global: ', err);
              this.toastService.showError('Error', err.error.message);
            },
          });
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
        this.assessmentCreationService.deleteQuiz(item.id as number).subscribe({
          next: (res) => {
            console.log('response from delete: ', res);
            this.toastService.showSuccess('Success', `${item.name} deleted successfully`);
          },
          error: (err) => {
            console.log('error from delete: ', err);
            this.toastService.showError('Error', err.error.message);
          },
        });
      },
      reject: () => {
        return null;
      },
    } as ExtendedConfirmation);
  }
}
