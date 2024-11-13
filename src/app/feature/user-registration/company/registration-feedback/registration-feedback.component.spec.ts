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

  it('should call handleAwaitingResponse when status is "awaiting"', () => {
    const spy = spyOn(component as any, 'handleAwaitingResponse');

    component.getFeedbackResponse('awaiting');

    expect(spy).toHaveBeenCalled();
    
  })

  it('should call handleRejectedResponse when status is "rejected"', () => {
    const spy = spyOn(component as any, 'handleRejectedResponse');

    component.getFeedbackResponse('rejected');
    expect(spy).toHaveBeenCalled();
  })

  it('should call handleSuccessResponse when status is "success"', () => {
    const spy = spyOn(component as any, 'handleSuccessResponse');

    component.getFeedbackResponse('success');
    expect(spy).toHaveBeenCalled();
  })
  
  
});
