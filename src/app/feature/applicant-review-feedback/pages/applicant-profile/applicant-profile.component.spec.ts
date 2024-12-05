import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ApplicantProfileComponent } from './applicant-profile.component';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { ConfirmationService } from 'primeng/api';

describe('ApplicantProfileComponent', () => {
  let component: ApplicantProfileComponent;
  let fixture: ComponentFixture<ApplicantProfileComponent>;
  let router: jasmine.SpyObj<Router>;
  let confirmationService: jasmine.SpyObj<ConfirmationService>;
  let toastService: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const confirmationSpy = jasmine.createSpyObj('ConfirmationService', ['confirm', 'reject']);
    const toastSpy = jasmine.createSpyObj('ToastService', ['showError', 'showSuccess']);

    await TestBed.configureTestingModule({
      imports: [ApplicantProfileComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ConfirmationService, useValue: confirmationSpy },
        { provide: ToastService, useValue: toastSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicantProfileComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    confirmationService = TestBed.inject(ConfirmationService) as jasmine.SpyObj<ConfirmationService>;
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "/dashboard/applicants"', () => {
    component.navigateToApplicantsPage();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/applicants']);
  });

  it('should call confirm with the correct configuration', () => {
    component.confirm(1);

    expect(confirmationService.confirm).toHaveBeenCalledWith(
      jasmine.objectContaining({
        header: 'Accept company',
        message: 'Are you sure that you want to accept company? This action cannot be reversed.',
      })
    );
  });

  it('should handle the accept callback successfully', () => {
    component.confirm(1);

    // Simulate the accept callback
    const confirmConfig = confirmationService.confirm.calls.mostRecent().args[0];
    confirmConfig.accept?.();

    expect(toastService.showSuccess).toHaveBeenCalledWith('Successful', 'Applicant approved successfully');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/applicants']);
  });
});
