import { Component, ElementRef, ViewChild } from '@angular/core';
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
import { DataViewModule } from 'primeng/dataview';
// import career creation form component
import { FormsModule } from '@angular/forms';
// import rxjs services
import { fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
// import interface
import {
  mockDetails,
  Programme,
  TabMenuList,
} from '../../../core/interfaces/interfaces';
import { ButtonModule } from 'primeng/button';

import { ProgrammeCardComponent } from '@src/app/shared/components/programme-card/programme-card.component';

@Component({
  selector: 'app-programme-application',
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
    OverlayPanelModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
    DataViewModule,
    ProgrammeCardComponent,
    FormsModule,
  ],
  templateUrl: './programme-application.component.html',
  styleUrl: './programme-application.component.scss',
})
export class ProgrammeApplicationComponent {
  constructor() {}

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
  filteredDateSearchData: any = [];

  // programmes
  all: any = [];
  saved: any = [];

  ngOnInit() {
    this.tabMenuList = [
      { label: 'Career programmes' },
      { label: 'Saved programmes' },
    ];

    this.activeItem = this.tabMenuList[0];
    // fetch programmes
    this.all = [
      {
        name: 'all',
      },
      {
        name: 'all',
      },
      {
        name: 'all',
      },
      {
        name: 'hello',
      },
    ];

    this.saved = [
      {
        name: 'Sav',
      },
      {
        name: 'Sav',
      },
      {
        name: 'Sav',
      },
      {
        name: 'Sav',
      },
    ];
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

  // TabMenu control function
  private setAllProgrammesTab() {
    this.resetTab();
    this.allProgrammes = true;
    this.activeTabData = 'all';
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
  // Date filter and search function
  onSearchOrDateFilter() {
    // clears search and date filter if both are empty
    if (!this.searchString && !this.dateFilter) {
      this.activeTabData === 'all'
        ? this.setAllProgrammesTab()
        : this.setSavedProgrammesTab();
      return;
    }
    console.log(this.dateFilter);
    const activeDataToFilter =
      this.activeTabData === 'all' ? this.all : this.saved;
    // performs search only
    if (this.searchString && !this.dateFilter) {
      this.displayFilteredProgrammes();
      this.filteredDateSearchData = activeDataToFilter.filter(
        (programme: any) => {
          return programme.name
            .toLowerCase()
            .includes(this.searchString.toLowerCase());
        }
      );
    }
    // performs date filter only
    if (!this.searchString && this.dateFilter) {
      this.displayFilteredProgrammes();
      this.filteredDateSearchData = activeDataToFilter.filter(
        (programme: any) => {
          return this.formatSelectedDate(programme.date) === this.dateFilter;
        }
      );
    }
    // performs search and date filter
    if (this.searchString && this.dateFilter) {
      this.displayFilteredProgrammes();
      this.filteredDateSearchData = activeDataToFilter.filter(
        (programme: any) => {
          return (
            programme.name
              .toLowerCase()
              .includes(this.searchString.toLowerCase()) &&
            this.formatSelectedDate(programme.date) === this.dateFilter
          );
        }
      );
    }
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
