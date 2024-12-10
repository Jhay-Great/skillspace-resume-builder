import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuizComponent } from './update-quiz.component';
import { AssessmentCreationService } from '../../services/assessment-creation/assessment-creation.service';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { of } from 'rxjs';

describe('UpdateQuizComponent', () => {
  let component: UpdateQuizComponent;
  let fixture: ComponentFixture<UpdateQuizComponent>;
  let mockAssessmentCreationService: jasmine.SpyObj<AssessmentCreationService>;
  let mockToastService: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    // Create mock services
    mockAssessmentCreationService = jasmine.createSpyObj('AssessmentCreationService', ['updateQuiz']);
    mockToastService = jasmine.createSpyObj('ToastService', ['showSuccess', 'showError']);

    await TestBed.configureTestingModule({
      imports: [UpdateQuizComponent],
      providers: [
        { provide: AssessmentCreationService, useValue: mockAssessmentCreationService },
        { provide: ToastService, useValue: mockToastService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe from subscriptions on component destroy', () => {
    const mockFormData = new FormData();
    mockAssessmentCreationService.updateQuiz.and.returnValue(of(mockFormData));

    component.onSubmit(mockFormData);

    const spy = spyOn(component['subscriptions'], 'unsubscribe');
    fixture.destroy();

    expect(spy).toHaveBeenCalled();
  });
});
