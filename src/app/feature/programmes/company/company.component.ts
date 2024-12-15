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
import { CalendarModule } from 'primeng/calendar';
// import career creation form component
import { CareerCreationFormComponent } from '../career-creation-form/career-creation-form.component';
import { TagComponent } from '@src/app/shared/components/tag/tag.component';
// import interface
import { ChangeHistory, mockDetails, Programme, TabMenuList } from '../../../core/interfaces/interfaces';
import { ButtonModule } from 'primeng/button';
// import programme service
import { ProgrammeService } from '../program-service/programme.service';
import { DateSuffixPipe } from '@src/app/core/pipes/datesuffix/date-suffix.pipe';
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
    CalendarModule,
    DateSuffixPipe,
    TagComponent,
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent {
  constructor(public programmeService: ProgrammeService) {}

  tabMenuList: TabMenuList[] = [];
  activeItem!: TabMenuList;
  activeTabData = 0;

  // form modal
  formModal = false;
  // delete modal
  deleteModal = false;
  // move to draft modal
  publishModal = false;

  mockdraft: mockDetails[] = [
    {
      name: 'Graduate Trainee Frontend',
      description: 'This programme is built for everyone',
      start: '4th September 2023',
      end: '10th June 2024',
      status: 'Draft',
    },
    {
      name: 'Data Science',
      description: 'This programme is built for everyone',
      start: '27th october 2023',
      end: '4th June 2024',
      status: 'Draft',
    },
    {
      name: 'Graduate Trainee Frontend',
      description: 'This programme is built for everyone',
      start: '4th January 2023',
      end: '4th June 2024',
      status: 'Draft',
    },
  ];

  mockHistory: mockDetails[] = [
    {
      name: 'May 30th 2023',
      description: 'Changed Programm Start Date',
      start: '4th September 2023',
      end: '10th June 2024',
      status: 'Draft',
    },
    {
      name: 'May 20th 2023',
      description: 'Changed: Program title',
      start: '27th october 2023',
      end: '4th June 2024',
      status: 'Draft',
    },
    {
      name: 'October 40th 1945',
      description: 'Changed Programme end date',
      start: '4th January 2023',
      end: '4th June 2024',
      status: 'Draft',
    },
  ];
  // tabMenu
  careerProgrammes = true;
  savedDraft = false;
  publishedProgrammes = false;

  // change history table
  changeHistoryTable = false;

  ngOnInit() {
    this.tabMenuList = [{ label: 'Career programmes' }, { label: 'Saved drafts' }, { label: 'Published programmes' }];

    this.activeItem = this.tabMenuList[0];
    // fetch programmes
    this.programmeService.getPrograms();
    // get all quizes(badges)
    this.programmeService.getQuizes();
  }

  // TabMenu control function
  private setCareerProgrammesTab() {
    this.resetTab();
    this.careerProgrammes = true;
    this.activeTabData = 0;
  }

  // TabMenu Total
  totalProgrammes(label: string) {
    switch (label) {
      case 'Career programmes':
        return this.programmeService.allProgrammes.length;
      case 'Saved drafts':
        return this.programmeService.draftProgram().length;
      case 'Published programmes':
        return this.programmeService.publishedProgram().length;
      default:
        return 0;
    }
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
  confirmModal(type: string, programme: Programme) {
    if (type === 'delete') {
      this.publishModal = false;
      this.deleteModal = true;
      this.programmeService.programmeToMoveOrDelete = programme;
      this.showDialog();
    }
    if (type === 'publish') {
      this.deleteModal = false;
      this.publishModal = true;
      this.programmeService.programmeToMoveOrDelete = programme;
      this.showDialog();
    }
  }
  // confirmation function
  confirmation(type: string) {
    const ProgrammeData = this.programmeService.programmeToMoveOrDelete;
    if (type === 'delete') {
      this.deleteProgramme(ProgrammeData.id, ProgrammeData);
      this.deleteModal = false;
      this.visible = false;
    }
    if (type === 'publish') {
      this.visible = false;
      this.publishModal = false;
      this.publishProgramme(ProgrammeData.id, ProgrammeData);
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

  // hide history table
  hideChangeHistoryTable() {
    this.changeHistoryTable = false;
  }
  // open history table
  openChangeHistoryTable(data: ChangeHistory[]) {
    // assings an array of currently clicked programme history
    this.programmeService.changesHistory = data;
    if (!this.changeHistoryTable) this.changeHistoryTable = true;
  }

  // publish programme
  publishProgramme(id: number, programme: Programme) {
    this.programmeService.publishProgram(id, programme);
  }
  // delete
  deleteProgramme(id: number, programme: Programme) {
    this.programmeService.deleteProgramme(id, programme);
  }
  // update programme
  updateProgramme(programme: Programme, duplicate: boolean) {
    // enable updating
    this.programmeService.updatingProgram = true;
    if (duplicate) {
      this.programmeService.duplicatingProgram = true;
    }

    this.programmeService.currentUpdatingProgram = programme;
    this.openForm();

    // hide changeHistory table if opened
    this.hideChangeHistoryTable();
  }

  formatToDateString(input: string | Date): string {
    const date = new Date(input);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  // formats time and date for changeHistory Display
  formatDateWithTime(input: string): string {
    const date = new Date(input);

    // Format the day with suffix (e.g., 13th, 1st)
    const day = date.getDate();
    const daySuffix =
      day % 10 === 1 && day !== 11
        ? 'st'
        : day % 10 === 2 && day !== 12
          ? 'nd'
          : day % 10 === 3 && day !== 13
            ? 'rd'
            : 'th';

    // Format the month
    const month = date.toLocaleString('default', { month: 'long' });

    // Get the year
    const year = date.getFullYear();

    // Format the time (HH:mm)
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Combine everything
    return `${day}${daySuffix} ${month} ${year}: ${hours}:${minutes}`;
  }

  // Function to get the suffix for the day (st, nd, rd, th)
  getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th'; // Special case for 11th to 19th
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}
