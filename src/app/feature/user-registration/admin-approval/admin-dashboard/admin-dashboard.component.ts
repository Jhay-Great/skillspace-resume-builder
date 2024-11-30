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
  date:string | null = null;
  showCalendar:boolean = false;
  isLoading:boolean = false;
  table = viewChild<Table>('dt1');
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
          this.applicants = response.data.content;

        },
        error: error => {
          this.toastService.showError('Error', 'Failed to load data')
        },
        complete: () => {},
      });

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
      this.table()?.filter(value.name, 'approvalStatus', 'equals');
    }else {
      this.table()?.clear();
    }
  }

  chooseDate(value:PDropDown) {
    const today = new Date();
    switch (value.name) {
      case 'All':
        this.table()?.clear();
        break;
      case 'Recent': 
        const day = today.getDate();
        const recent = day - 1;
        const setDay = today.setDate(recent);
        const calcDay = new Date(setDay);
        const recentDate = `${calcDay.getFullYear()}-${calcDay.getMonth()+ 1}-${calcDay.getDate()}`;

        this.table()?.filter(recentDate, 'createdAt', 'contains');
        break;
      case 'Last week':
        const endOfWeek = today;
        const startOfLastWeek = new Date();
        startOfLastWeek.setDate(today.getDate() - 7);


        break;
      case 'Last month':
        
        break;
      case 'Custom':
        
        
        break;
      default:
        
        break;
    }
    
  }
  
  hideCalendar(event:Event) {
    if (!this.showCalendar) return;
    
  }
  
}

