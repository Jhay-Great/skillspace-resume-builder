import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
// import programme application service
import { ProgrammeApplicationService } from '../programme-application-service/programme-application.service';
// import primeng modules needed
import { TabMenuModule } from 'primeng/tabmenu';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { DataViewModule } from 'primeng/dataview';
import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
// import career creation form component
import { FormsModule } from '@angular/forms';
// import rxjs services
import { fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, take } from 'rxjs/operators';
// import interface
import { CompanyProgramme, TabMenuList } from '../../../core/interfaces/interfaces';
import { ButtonModule } from 'primeng/button';

// import components
import { ProgrammeCardComponent } from '@src/app/shared/components/programme-card/programme-card.component';
import { ViewedProgrammeComponent } from '../viewed-programme/viewed-programme.component';
import { ProgrammeApplyFormComponent } from '../programme-apply-form/programme-apply-form.component';

@Component({
  selector: 'app-programme-application',
  standalone: true,
  imports: [
    CommonModule,
    TabMenuModule,
    RippleModule,
    BadgeModule,
    InputIconModule,
    InputTextModule,
    IconFieldModule,
    OverlayPanelModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
    DataViewModule,
    ProgrammeCardComponent,
    FormsModule,
    SplitButtonModule,
    ViewedProgrammeComponent,
    ProgrammeApplyFormComponent,
  ],
  templateUrl: './programme-application.component.html',
  styleUrl: './programme-application.component.scss',
})
export class ProgrammeApplicationComponent {
  constructor(public programmeApplicationService: ProgrammeApplicationService) {
    this.status = [
      {
        label: 'Available',
        command: () => {},
      },
      {
        label: 'Coming Soon',
        command: () => {},
      },
      { label: 'Closed', url: 'http://angular.io' },
    ];
  }

  ngOnInit() {
    // get all available programmes
    this.programmeApplicationService
      .getAllAvailableProgrammes()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.all = data;
          console.log(this.all[0]);
        },
        error: (error) => {
          console.log(error);
        },
      });

    // asigns labels to Tabs
    this.tabMenuList = [{ label: 'Career programmes' }, { label: 'Saved programmes' }];
    // set active Tab
    this.activeItem = this.tabMenuList[0];
  }
  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(300), // Wait 300ms after typing stops
        distinctUntilChanged() // Ignore duplicate values
      )
      .subscribe((_query: string) => {
        this.onSearchOrDateFilter();
      });
  }

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  // TabMenu list
  tabMenuList: TabMenuList[] = [];
  activeItem!: TabMenuList;
  activeTabData = 'all';

  // form modal
  formModal = false;

  // tabMenu
  allProgrammes = true;
  savedProgrammes = false;

  // filtering programm by date or search
  filteringProgrammes = false;
  searchString: string = '';
  dateFilter: string = '';
  statusFilter: string = '';
  status: MenuItem[] = [];
  filteredDateSearchData: CompanyProgramme[] = [];

  // viewing programme details
  viewProgrammeDetails = false;

  // programmes
  all: CompanyProgramme[] = [];
  saved: CompanyProgramme[] = [];

  // TabMenu control function
  private setAllProgrammesTab() {
    this.resetTab();
    this.allProgrammes = true;
    this.activeTabData = 'all';
  }

  // tab programme total
  totalProgrammes(label: string) {
    switch (label) {
      case 'Career programmes':
        return this.all.length;
      case 'Saved programmes':
        return this.saved.length;
      default:
        return 0;
    }
  }

  private setSavedProgrammesTab() {
    this.resetTab();
    this.savedProgrammes = true;
    this.activeTabData = 'saved';
  }

  private displayFilteredProgrammes() {
    this.resetTab();
    this.filteringProgrammes = true;
  }

  private resetTab() {
    this.allProgrammes = false;
    this.savedProgrammes = false;
    this.filteringProgrammes = false;
    this.viewProgrammeDetails = false;
  }

  setActiveTab(title: string) {
    switch (title) {
      case 'Career programmes':
        this.setAllProgrammesTab();
        break;
      case 'Saved programmes':
        this.setSavedProgrammesTab();
        break;
      default:
        break;
    }
  }
  // view programm function
  viewProgramme(programme: CompanyProgramme) {
    this.programmeApplicationService.currentlyViewingProgramme = programme;
    this.resetTab();
    this.viewProgrammeDetails = true;
  }
  // move programme to saved
  moveToSaved(programme: CompanyProgramme) {
    if (this.saved.includes(programme)) return;
    this.saved.push(programme);
  }
  // Date filter and search function
  onSearchOrDateFilter() {
    console.log(this.dateFilter);

    // clears search and date filter if both are empty
    if (!this.searchString && !this.dateFilter) {
      this.activeTabData === 'all' ? this.setAllProgrammesTab() : this.setSavedProgrammesTab();
      return;
    }
    const activeDataToFilter = this.activeTabData === 'all' ? this.all : this.saved;
    // performs search only
    if (this.searchString && !this.dateFilter) {
      this.displayFilteredProgrammes();
      this.filteredDateSearchData = activeDataToFilter.filter((programme: CompanyProgramme) => {
        return programme.name.toLowerCase().includes(this.searchString.toLowerCase());
      });
    }
    // performs date filter only
    if (!this.searchString && this.dateFilter) {
      this.displayFilteredProgrammes();
      this.filteredDateSearchData = activeDataToFilter.filter((programme: CompanyProgramme) => {
        return this.formatSelectedDate(programme.startDate) === this.dateFilter;
      });
    }
    // performs search and date filter
    if (this.searchString && this.dateFilter) {
      const formattedDate = this.formatSelectedDate(new Date(this.dateFilter));
      this.displayFilteredProgrammes();
      this.filteredDateSearchData = activeDataToFilter.filter((programme: CompanyProgramme) => {
        return (
          programme.name.toLowerCase().includes(this.searchString.toLowerCase()) &&
          this.formatSelectedDate(programme.startDate) === this.dateFilter
        );
      });
    }
  }

  formatDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0'); // Ensure day is two digits
    return `${year}-${month}-${day}`;
  }

  // Modals Functionalities
  visible: boolean = false;
  showDialog() {
    this.visible = true;
  }

  // open form
  openForm() {
    this.formModal = true;
  }
  // close form
  closeForm() {
    this.formModal = false;
  }

  // date filter function
  formatSelectedDate(event: Date) {
    const selectedDate = event;
    // Get the day, month, and year
    const day = selectedDate.getDate();
    const month = selectedDate.toLocaleString('default', { month: 'long' }); // "June"
    const year = selectedDate.getFullYear();
    // Get the day suffix (st, nd, rd, th)
    const suffix = this.getDaySuffix(day);
    // Format the date as "4th June 2023"
    return `${day}${suffix} ${month} ${year}`;
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
