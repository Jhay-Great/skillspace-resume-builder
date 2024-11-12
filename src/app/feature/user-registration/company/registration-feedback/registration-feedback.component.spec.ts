import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFeedbackComponent } from './registration-feedback.component';

describe('RegistrationFeedbackComponent', () => {
  let component: RegistrationFeedbackComponent;
  let fixture: ComponentFixture<RegistrationFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
