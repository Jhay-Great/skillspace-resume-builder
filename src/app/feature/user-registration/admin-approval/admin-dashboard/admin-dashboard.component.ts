import { Component, DestroyRef, HostListener, viewChild, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// primeng modules
import { TableModule, Table } from 'primeng/table';
import { FilterMatchMode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

// local modules or imports
import { ApplicantResponse, ApplicantsData, ApplicantData } from '@src/app/core/interfaces/user-registration.interface';
import { AdminApprovalService } from '../../service/admin-approval/admin-approval.service';
import { TagComponent } from '@shared/components/tag/tag.component';
import { SearchInputComponent } from '@shared/components/search-input/search-input.component';
import { ToastService } from '@core/services/toast-service/toast.service';
import { InitialsPipe } from '@core/pipes/initials/initials.pipe';
import { EllipsisPipe } from '@core/pipes/truncate-with-ellipsis/ellipsis.pipe';
import { CapitalizePipe } from '@core/pipes/capitalize/capitalize.pipe';

interface PDropDown {
  name: string;
  value: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TagModule,
    AvatarModule,
    OverlayPanelModule,
    DropdownModule,
    CalendarModule,
    TagComponent,
    SearchInputComponent,
    DatePipe,
    InitialsPipe,
    EllipsisPipe,
    CapitalizePipe,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  applicants!: ApplicantsData[];
  selectedStatus!:PDropDown;
  selectedDate!:PDropDown;
  date:any;
  showCalendar:boolean = false;
  isLoading:boolean = false;
  table = viewChild<Table>('dt1');
  filters: any = {};
  isOpen:boolean = false;

  constructor(
    private adminApprovalService: AdminApprovalService,
    private destroyRef: DestroyRef,
    private toastService: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.adminApprovalService
      .getCompanies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: response => {
          this.applicants = response.data;

        },
        error: error => {
          this.toastService.showError('Error', 'Failed to load data')
        },
        complete: () => {},
      });

  }

  getSeverity(status: string) {
    if (status === 'approved') return 'success';
    if (status === 'rejected') return 'danger';
    else return 'warning';
  }

  selectedApplicant(id:number) {
    const applicant = this.applicants.find(user => user.id === id);
    if (!applicant) return;
    this.adminApprovalService.selectedUser.set(applicant);
    this.router.navigate([`/dashboard/approvals/${id}`])
  }

  onSearch(query:string) {
    this.table()?.filterGlobal(query, 'contains');
  }

  displayStatus() {
    return [
      {name: 'All', value: 'All'},
      {name: 'Pending', value: 'PENDING'},
      {name: 'Approved', value: 'APPROVED'},
      {name: 'Rejected', value: 'REJECTED'},
    ]
  }
  displayDateFilter() {
    return [
      {name: 'All', value: 'Application date'},
      {name: 'Recent', value: 'recent'},
      {name: 'Last week', value: 'last week'},
      {name: 'Last month', value: 'last month'},
      {name: 'Custom', value: 'custom'},
    ]
  }

  chooseStatus(value:PDropDown) {
    if (value.name !== 'All') {
      this.table.filter(value.name, 'approvalStatus', 'equals');
    }else {
      this.table.clear();
    }
  }

  chooseDate(value:PDropDown) {
    const today = new Date();
    console.log('logging initial today: ', today);
    switch (value.name) {
      case 'All':
        this.table.clear();
        break;
      case 'Recent': 
        const day = today.getDate();
        const recent = day - 1;
        const setDay = today.setDate(recent);
        const calcDay = new Date(setDay);
        // console.log(calcDay);
        const recentDate = `${calcDay.getFullYear()}-${calcDay.getMonth()+ 1}-${calcDay.getDate()}`;

        this.table.filter(recentDate, 'createdAt', 'contains');
        console.log('recent was clicked...');
        console.log(recentDate);
        break;
      case 'Last week':
        const endOfWeek = today;
        const startOfLastWeek = new Date();
        startOfLastWeek.setDate(today.getDate() - 7);

        console.log(endOfWeek, startOfLastWeek);
        
        
        // console.log('end of week: ', endOfWeek);
        // const lastWeek = today.getDate() - 7;
        // const setDate = today.setDate(lastWeek);
        // const calcDate = new Date(setDate);

        // const result = `${calcDate.getFullYear()}-${calcDate.getMonth()+ 1}-${calcDate.getDate()}`;

        // console.log('today: ', today);
        // console.log('last week: ', lastWeek);
        // console.log('set date: ', setDate);

        // this.table.filter(result, 'createdAt', 'contains');
        console.log('last week was clicked...');
        // console.log(this.table.filter(result, 'createdAt', 'contains'))

        break;
      case 'Last month':
        // const now = new Date();

        // // Calculate the first and last day of the previous month
        // const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        // const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        // // console.log('Last Month Range:', firstDayOfLastMonth, lastDayOfLastMonth);
        
        // this.table.filter(
        //   { start: firstDayOfLastMonth, end: lastDayOfLastMonth },
        //   'createdAt',
        //   'between'
        // );
        
        
        
        // const month = date.getMonth() + 1;
        // const lastMonth = month - 1;
        // const setMonth = date.setDate(lastMonth);
        // // const calcMonth = new Date(setMonth);

        // // const monthDate = `${calcMonth.getFullYear()}-${calcMonth.getMonth()+ 1}-${calcMonth.getDate()}`;

        // // this.table.filter(monthDate, 'createdAt', 'contains');
        // // console.log(this.table.filter(monthDate, 'createdAt', 'contains'))
        // console.log('last month: ', month, lastMonth);
        break;
      case 'Custom':
        console.log('custom was clicked...: ', value);
        // this.selectedDate.name = '';
        // this.showCalendar = true;
        
        break;
      default:
        // console.log('no value: ', value);
        break;
    }
    
  }

  @HostListener('document:click', ['$event'])
  // toggleCalendar(event: Event):void {
  //   const element = event.target as HTMLElement;
  //   const calendarElement = element.closest('#application-date-dropdown');
  //   const containerElement = element.closest('#mainContainer');

  //   console.log(!calendarElement && this.selectedDate?.name !== 'Custom')


  //   if (calendarElement && this.selectedDate?.name === 'Custom') {
  //     // console.log('calendar was clicked')
  //   }

  //   // console.log('container was clicked')
  //   if (!calendarElement && this.selectedDate?.name !== 'Custom') {
  //     console.log('this block also run...')
  //     this.showCalendar = false;
  //     if (!this.selectedDate) {
  //       return;
  //     }
  //     this.selectedDate.name = '';
  //     this.selectedDate.value = '';

  //   }
    
    
  // }

  hideCalendar(event:Event) {
    if (!this.showCalendar) return;

    // this.table.clear();
    
    // const target = event.target as HTMLElement;
    // console.log(target.textContent);
    // if (target.textContent !== 'Custom' && this.showCalendar) {
    //   console.log('hide calendar is clicked...')
    //   this.showCalendar = false;

    // }
  }

  // handleDropdownChange(event: any): void {
  //   console.log('called...')
  //   if (event.value === 'Custom') {
  //     this.showCalendar = true;
  //   } else {
  //     this.showCalendar = false;
  //   }
  // }

  // @HostListener('document:click', ['$event'])
  // handleOutsideClick(event: Event): void {
  //   const element = event.target as HTMLElement;
  //   const target = element.closest('#application-date-dropdown');
  //   const container = element.closest('#mainContainer');

  //   // console.log({target, showCalendar: this.showCalendar, isOpen: this.isOpen})
  //   // console.log(target);
  //   if (target && !this.showCalendar && this.isOpen) {
  //     console.log({target, showCalendar: this.showCalendar, isOpen: this.isOpen})
  //     // console.log('clicked occurred in host listener when calendar is not shown')
  //     this.showCalendar = true;
  //     return;
  //   }
    
  //   this.isOpen = !this.isOpen;
    
  //   if (container && this.showCalendar && !this.isOpen) {
  //     // console.log('clicked occurred in host listener when calendar is shown')
  //     console.log({target, showCalendar: this.showCalendar, isOpen: this.isOpen})
  //     this.showCalendar = false;

  //   }


  // }


  // // Prevent hiding calendar when clicking inside it
  // preventClose(event: MouseEvent): void {
  //   event.stopPropagation();
  // }
}

