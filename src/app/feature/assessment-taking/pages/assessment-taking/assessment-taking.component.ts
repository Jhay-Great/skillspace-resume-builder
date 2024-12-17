import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { TabMenuList } from '@src/app/core/interfaces/interfaces';
import { AssessmentsTab, Quiz } from '@src/app/feature/assessment-creation/models/assessments.model';
import { AssessmentCreationService } from '@src/app/feature/assessment-creation/services/assessment-creation/assessment-creation.service';
import { MenuItem } from 'primeng/api';
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
import { TabViewModule } from 'primeng/tabview';
import { TieredMenu, TieredMenuModule } from 'primeng/tieredmenu';
import { TagModule } from 'primeng/tag';
import { AllQuizzes, AvailableQuiz, DropdownItem } from '../../models/quiz-taking.model';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TagComponent } from '../../../../shared/components/tag/tag.component';
import { TakeQuizComponent } from '../../components/take-quiz/take-quiz.component';
import { AssessmentTakingService } from '../../services/assessment-taking/assessment-taking.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-assessment-taking',
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
    TagModule,
    DropdownModule,
    FormsModule,
    TagComponent,
    TakeQuizComponent,
    ProgressSpinnerModule,
  ],
  templateUrl: './assessment-taking.component.html',
  styleUrl: './assessment-taking.component.scss',
})
export class AssessmentTakingComponent implements OnInit {
  tabMenuList: AssessmentsTab[] = [];
  activeItem!: AssessmentsTab;
  activeTabData = 0;
  // tabMenu
  allAssessments = true;
  availableQuizzes = false;
  completedQuizzes = false;
  tieredMenuItems: MenuItem[] | undefined;
  selectedQuiz: Quiz | null = null;
  // companies
  companies!: DropdownItem[];
  selectedCompany: string | undefined;

  // badges
  badges!: DropdownItem[];
  selectedBadge: string | undefined;

  selectedQuizId: number | null = null;

  showTakeQuiz(quizId: number) {
    this.assessmentTakingService.showTakeQuiz();
    this.selectedQuizId = quizId;
  }

  @ViewChild('tieredMenu') tieredMenu!: TieredMenu;

  // allAssessmentsData: AllQuizzes[] = [
  //   {
  //     id: 1,
  //     requiredQuizId: 2,
  //     quizName: 'UI/UX Design Quiz 1',
  //     companyName: 'Amalitech',
  //     score: 10,
  //     badgeStatus: 'Passed',
  //     badgeName: 'UI/UX',
  //     lastModified: '4th June 2023',
  //     nextRetry: '4th June 2023',
  //     totalRetries: 2,
  //   },
  //   {
  //     id: 2,
  //     requiredQuizId: 2,
  //     quizName: 'UI/UX Design Quiz 2',
  //     companyName: 'Hubtel',
  //     score: 10,
  //     badgeStatus: 'Passed',
  //     badgeName: 'UI/UX',
  //     lastModified: '4th June 2023',
  //     nextRetry: '4th June 2023',
  //     totalRetries: 2,
  //   },
  //   {
  //     id: 3,
  //     requiredQuizId: 2,
  //     quizName: 'Frontend Quiz 1',
  //     companyName: 'Amalitech',
  //     score: 10,
  //     badgeStatus: 'Failed',
  //     badgeName: 'Frontend',
  //     lastModified: '4th June 2023',
  //     nextRetry: '4th June 2023',
  //     totalRetries: 2,
  //   },
  // ];

  // availableQuizzesData: AvailableQuiz[] = [
  //   {
  //     quizId: 1,
  //     quizName: 'UI/UX Design Quiz 1',
  //     publishedDate: 'October 3, 2024',
  //     requiredPassMark: 60,
  //     createdBy: 'Amalitech',
  //     totalMark: 100,
  //   },
  //   {
  //     quizId: 2,
  //     quizName: 'Data Science Quiz 1',
  //     publishedDate: 'October 3, 2024',
  //     requiredPassMark: 60,
  //     createdBy: 'Hubtel',
  //     totalMark: 100,
  //   },
  //   {
  //     quizId: 3,
  //     quizName: 'Frontend Quiz 1',
  //     publishedDate: 'October 3, 2024',
  //     requiredPassMark: 60,
  //     createdBy: 'Amalitech',
  //     totalMark: 100,
  //   },
  // ];
  // completedQuizzesData: AllQuizzes[] = [
  //   {
  //     id: 1,
  //     requiredQuizId: 2,
  //     quizName: 'UI/UX Design Quiz 1',
  //     companyName: 'Amalitech',
  //     score: 10,
  //     badgeStatus: 'Passed',
  //     badgeName: 'UI/UX',
  //     lastModified: '4th June 2023',
  //     nextRetry: '4th June 2023',
  //     totalRetries: 2,
  //   },
  //   {
  //     id: 2,
  //     requiredQuizId: 2,
  //     quizName: 'UI/UX Design Quiz 2',
  //     companyName: 'Hubtel',
  //     score: 10,
  //     badgeStatus: 'Passed',
  //     badgeName: 'Frontend',
  //     lastModified: '4th June 2023',
  //     nextRetry: '4th June 2023',
  //     totalRetries: 2,
  //   },
  // ];

  constructor(public assessmentTakingService: AssessmentTakingService) {}

  ngOnInit() {
    this.tabMenuList = [
      { label: 'All assessments', data: this.assessmentTakingService.allAssessmentsData },
      { label: 'Available quizzes', data: this.assessmentTakingService.availableQuizzesData },
      { label: 'Completed quizzes', data: this.assessmentTakingService.completedQuizzesData },
    ];
    this.activeItem = this.tabMenuList[0];

    this.assessmentTakingService.getAllAssessments().subscribe();
    this.assessmentTakingService.getAvailableQuizzes().subscribe();
    this.assessmentTakingService.getcompletedQuizzes().subscribe();

    // set companies
    this.companies = [
      { name: 'All', code: '' },
      { name: 'Amalitech', code: 'Amalitech' },
      { name: 'Hubtel', code: 'Hubtel' },
      { name: 'Google', code: 'Google' },
    ];

    // set badges
    this.badges = [
      { name: 'All', code: '' },
      { name: 'UI/UX', code: 'UI/UX' },
      { name: 'Frontend', code: 'Frontend' },
      { name: 'Backend', code: 'Backend' },
    ];
    this.tieredMenuItems = [
      {
        label: 'View',
        icon: 'pi pi-eye',
        command: () => {
          // view quiz
        },
      },
      {
        label: 'Retake',
        icon: 'pi pi-refresh',
        command: () => {
          // retake quiz
        },
      },
    ];
  }
  private setAllAssessmentsTab() {
    this.resetTab();
    this.allAssessments = true;
    this.activeTabData = 0;
  }

  private setAvailableQuizzesTab() {
    this.resetTab();
    this.availableQuizzes = true;
    this.activeTabData = 1;
  }

  private setCompletedQuizzesTab() {
    this.resetTab();
    this.completedQuizzes = true;
    this.activeTabData = 2;
  }

  private resetTab() {
    this.allAssessments = false;
    this.availableQuizzes = false;
    this.completedQuizzes = false;
  }

  setActiveTab(title: string) {
    this.assessmentTakingService.closeTakeQuiz();
    switch (title) {
      case 'All assessments':
        this.setAllAssessmentsTab();
        break;
      case 'Available quizzes':
        this.setAvailableQuizzesTab();
        break;
      case 'Completed quizzes':
        this.setCompletedQuizzesTab();
        break;
      default:
        break;
    }
  }

  getActiveTabData() {
    switch (this.activeTabData) {
      case 0:
        return this.assessmentTakingService.allAssessmentsData();
      // return this.allAssessmentsData
      case 1:
        return this.assessmentTakingService.availableQuizzesData();
      // return this.availableQuizzesData
      case 2:
        return this.assessmentTakingService.completedQuizzesData();
      // return this.availableQuizzesData
      default:
        return this.assessmentTakingService.allAssessmentsData();
      // return this.allAssessmentsData
    }
  }

  getActiveTabLoadingState() {
    switch (this.activeTabData) {
      case 0:
        return this.assessmentTakingService.isAllAssessmentLoading();
      case 1:
        return this.assessmentTakingService.isAvailableQuizzesLoading();
      case 2:
        return this.assessmentTakingService.isCompletedQuizzesLoading();
      default:
        return this.assessmentTakingService.isAllAssessmentLoading();
    }
  }

  openTieredMenu(event: Event, quiz: Quiz) {
    this.selectedQuiz = quiz;
    this.tieredMenu.toggle(event);
  }
}