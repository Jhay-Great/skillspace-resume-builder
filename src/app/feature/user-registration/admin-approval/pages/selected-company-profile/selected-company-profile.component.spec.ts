import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCompanyProfileComponent } from './selected-company-profile.component';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AdminApprovalService } from '../../../service/admin-approval/admin-approval.service';
import { DestroyRef } from '@angular/core';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { of } from 'rxjs';

describe('SelectedCompanyProfileComponent', () => {
  let component: SelectedCompanyProfileComponent;
  let fixture: ComponentFixture<SelectedCompanyProfileComponent>;
  let router: jasmine.SpyObj<Router>;
  let confirmationService: jasmine.SpyObj<ConfirmationService>;
  let adminApprovalService: jasmine.SpyObj<AdminApprovalService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let destroyRef: DestroyRef;

  beforeEach(async () => {
    const confirmationSpy = jasmine.createSpyObj('ConfirmationService', ['confirm']);
    const adminApprovalSpy = jasmine.createSpyObj('AdminApprovalService', ['acceptApplicant']);
    const toastSpy = jasmine.createSpyObj('ToastService', ['showSuccess', 'showError']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      imports: [SelectedCompanyProfileComponent, ],
      providers: [
        { provide: ConfirmationService, useValue: confirmationSpy },
        { provide: AdminApprovalService, useValue: adminApprovalSpy },
        { provide: ToastService, useValue: toastSpy },
        { provide: Router, useValue: routerSpy },
        DestroyRef
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectedCompanyProfileComponent);
    component = fixture.componentInstance;
    confirmationService = TestBed.inject(ConfirmationService) as jasmine.SpyObj<ConfirmationService>;
    adminApprovalService = TestBed.inject(AdminApprovalService) as jasmine.SpyObj<AdminApprovalService>;
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    destroyRef = TestBed.inject(DestroyRef);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show confirmation dialog with correct message', () => {
    component.confirm(1);

    expect(confirmationService.confirm).toHaveBeenCalledWith({
      header: 'Accept company',
      message: 'Are you sure that you want to accept company? This action cannot be reversed.',
      accept: jasmine.any(Function),
      reject: jasmine.any(Function)
    });
    expect(component.isApproved).toBeTrue();
  });

  it('should handle successful confirmation and API call', () => {
    adminApprovalService.acceptApplicant.and.returnValue(of({}));
    
    component.confirm(1);
    const confirmConfig = confirmationService.confirm.calls.mostRecent().args[0];
    if (confirmConfig.accept) {
      confirmConfig.accept();
  }
    expect(adminApprovalService.acceptApplicant).toHaveBeenCalledWith(1);
    expect(toastService.showSuccess).toHaveBeenCalledWith(
      'Successful',
      'Applicant approved successfully'
    );
    expect(component.isApproved).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/approvals']);
  });

  it('should handle rejection of confirmation dialog', () => {
    component.confirm(1);
    const confirmConfig = confirmationService.confirm.calls.mostRecent().args[0];
    if (confirmConfig.reject) {
      confirmConfig.reject();
  }

    expect(component.isApproved).toBeFalse();
    expect(adminApprovalService.acceptApplicant).not.toHaveBeenCalled();
  });

  it('should navigate to dashboard/approvals when navigateToHome is called', () => {
    component.navigateToHome();
    
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/approvals']);
    expect(router.navigate).toHaveBeenCalledTimes(1);
  });
});
