import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileManagementComponent } from './profile-management.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { ProfileManagementService } from '../../services/profile-management.service';

describe('ProfileManagementComponent', () => {
  let component: ProfileManagementComponent;
  let fixture: ComponentFixture<ProfileManagementComponent>;
  let formBuilder: FormBuilder;
  let toastService: jasmine.SpyObj<ToastService>;
  let profileService: jasmine.SpyObj<ProfileManagementService>;


  beforeEach(async () => {
    const toastSpy = jasmine.createSpyObj('ToastService', ['showError']);
    const profileServiceSpy = jasmine.createSpyObj('ProfileService', ['updateCompanyProfile']);

    await TestBed.configureTestingModule({
      imports: [ProfileManagementComponent, ReactiveFormsModule],
      providers: [
        { provide: ToastService, useValue: toastSpy },
        { provide: ProfileManagementService, useValue: profileServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileManagementComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    profileService = TestBed.inject(ProfileManagementService) as jasmine.SpyObj<ProfileManagementService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showError if the form is invalid', () => {
    const invalidForm: FormGroup = formBuilder.group({
      name: [''],
      email: [''],
    });

    const result = component.validateForm(invalidForm);

    expect(result).toBeNull();
    expect(toastService.showError).toHaveBeenCalledWith(
      'Invalid data',
      'Ensure all fields are filled'
    );
  });

  it('should return form values if the form is valid', () => {
    const validForm: FormGroup = formBuilder.group({
      name: ['John Doe'],
      email: ['john@example.com'],
    });

    const result = component.validateForm(validForm);

    expect(result).toEqual({ name: 'John Doe', email: 'john@example.com' }); 
    expect(toastService.showError).not.toHaveBeenCalled(); 
  });

  it('should call updateCompanyProfile with the correct data', () => {
    const mockData = { name: 'Test Company', email: 'test@company.com' };

    component.onSubmit(mockData);

    expect(profileService.updateCompanyProfile).toHaveBeenCalledWith(mockData);
  });
  
});
