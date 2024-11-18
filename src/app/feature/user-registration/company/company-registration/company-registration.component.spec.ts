import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegistrationComponent } from './company-registration.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('CompanyRegistrationComponent', () => {
  let component: CompanyRegistrationComponent;
  let fixture: ComponentFixture<CompanyRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyRegistrationComponent, ReactiveFormsModule],
      providers: [FormBuilder, FormGroup, FormControl],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the stepper count', () => {
    let step1 = 1;
    let currentStep = 2

    component.onContinue(currentStep);
    expect(step1).toBe(currentStep)
  })

  it('should reduce the current stepper count by 1', () => {
    const step1 = 2;
    component.onBack();
    expect(step1).toBe(1);

    const step2 = 3;
    component.onBack();
    expect(step2).toBe(2);

  })
  
  it('should create the form', () => {
    const companyForm = component.formInitialization();

    expect(companyForm).toBeTruthy()

    expect(companyForm.contains('credentials')).toBeTrue();
    expect(companyForm.contains('information')).toBeTrue();

    const credentialsGroup = companyForm.get('credentials') as FormGroup;
    const informationGroup = companyForm.get('information') as FormGroup;

    expect(credentialsGroup.contains('name')).toBeTrue();
    expect(credentialsGroup.contains('email')).toBeTrue();
    expect(credentialsGroup.contains('password')).toBeTrue();
    expect(credentialsGroup.contains('confirmPassword')).toBeTrue();
  
    expect(informationGroup.contains('website')).toBeTrue();
    expect(informationGroup.contains('certificate')).toBeTrue();
    expect(informationGroup.contains('logo')).toBeTrue();
    expect(informationGroup.contains('contact')).toBeTrue();
    
  })

  it('should get the form controls', () => {
    const companyForm = component.formInitialization();
    
    const control = component.getFormControl('credentials.name');
    expect(control).toBeTruthy()

    // checking if the control is an instance of form control
    expect(control instanceof FormControl).toBeTrue();
    
  })
  
  
});
