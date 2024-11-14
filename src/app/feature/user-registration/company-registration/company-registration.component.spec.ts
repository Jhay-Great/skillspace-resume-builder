import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegistrationComponent } from './company-registration.component';

describe('CompanyRegistrationComponent', () => {
  let component: CompanyRegistrationComponent;
  let fixture: ComponentFixture<CompanyRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyRegistrationComponent]
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
});
