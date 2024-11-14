import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFeedbackContentComponent } from './registration-feedback-content.component';

describe('RegistrationFeedbackContentComponent', () => {
  let component: RegistrationFeedbackContentComponent;
  let fixture: ComponentFixture<RegistrationFeedbackContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationFeedbackContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationFeedbackContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
