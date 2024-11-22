import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { ApplicantsData } from '@src/app/core/interfaces/user-registration.interface';
import { Router } from '@angular/router';
import { AdminApprovalService } from '../../service/admin-approval/admin-approval.service';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let adminApprovalService: jasmine.SpyObj<AdminApprovalService>;
  let router: jasmine.SpyObj<Router>;
  let mockApplicants: ApplicantsData[];

  beforeEach(async () => {
    const adminApprovalSpy = jasmine.createSpyObj('AdminApprovalService', [], {
      selectedUser: jasmine.createSpyObj('Signal', ['set'])
    });
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    mockApplicants = [
      {
        id: 1,
        role: 'company',
        isOtpVerified: true,
        approvalStatus: 'pending',
        logo: 'logo1.png',
        certificate: 'cert1.pdf',
        name: 'Tech Innovations Inc',
        email: 'contact@techinnovations.com',
        website: 'https://techinnovations.com',
        contact: '+1234567890',
        createdAt: '2023-01-15T10:30:00Z'
      },
      {
        id: 2,
        role: 'company',
        isOtpVerified: true,
        approvalStatus: 'approved',
        logo: 'logo2.png',
        certificate: 'cert2.pdf',
        name: 'Global Solutions Ltd',
        email: 'info@globalsolutions.com',
        website: 'https://globalsolutions.com',
        contact: '+0987654321',
        createdAt: '2023-02-20T14:45:00Z'
      },
    ];
    
    component.applicants = mockApplicants;

    await TestBed.configureTestingModule({
      imports: [AdminDashboardComponent],
      providers: [
        { provide: AdminApprovalService, useValue: adminApprovalSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    adminApprovalService = TestBed.inject(AdminApprovalService) as jasmine.SpyObj<AdminApprovalService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return "success" when status is "approved"', () => {
    const status = 'approved';
    const result = component.getSeverity(status);
    expect(result).toBe('success');
  });

  it('should return "danger" when status is "rejected"', () => {
    const status = 'rejected';
    const result = component.getSeverity(status);
    expect(result).toBe('danger');
  });

  it('should return "info" for any other status', () => {
    const statuses = ['pending', 'in-progress', '', 'unknown'];
    
    statuses.forEach(status => {
      const result = component.getSeverity(status);
      expect(result).toBe('info');
    });
  });

  it('should set selected user and navigate when valid ID is provided', () => {
    const expectedApplicant = mockApplicants[0];
    
    component.selectedApplicant(1);

    expect(adminApprovalService.selectedUser.set)
      .toHaveBeenCalledWith(expectedApplicant);
    expect(router.navigate)
      .toHaveBeenCalledWith(['/dashboard/approvals/1']);
  });

  it('should find exact ID match', () => {
    const expectedApplicant = mockApplicants[1]; 
    
    component.selectedApplicant(2);

    expect(adminApprovalService.selectedUser.set)
      .toHaveBeenCalledWith(expectedApplicant);
    expect(router.navigate)
      .toHaveBeenCalledWith(['/dashboard/approvals/2']);
  });
  
  
});
