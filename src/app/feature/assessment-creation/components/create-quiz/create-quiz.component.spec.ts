import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateQuizComponent } from './create-quiz.component';
import { AssessmentCreationService } from '../../services/assessment-creation/assessment-creation.service';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { of, throwError } from 'rxjs';

describe('CreateQuizComponent', () => {
  let component: CreateQuizComponent;
  let fixture: ComponentFixture<CreateQuizComponent>;
  let mockAssessmentCreationService: jasmine.SpyObj<AssessmentCreationService>;
  let mockToastService: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    // Create mock services
    mockAssessmentCreationService = jasmine.createSpyObj('AssessmentCreationService', ['createQuiz']);
    mockToastService = jasmine.createSpyObj('ToastService', ['showSuccess', 'showError']);

    await TestBed.configureTestingModule({
      imports: [CreateQuizComponent],
      providers: [
        { provide: AssessmentCreationService, useValue: mockAssessmentCreationService },
        { provide: ToastService, useValue: mockToastService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not call createQuiz when formData is null or undefined', () => {
    const mockResponse = new FormData();
    mockAssessmentCreationService.createQuiz.and.returnValue(of(mockResponse));

    component.onSubmit(null as unknown as FormData);

    expect(mockAssessmentCreationService.createQuiz).not.toHaveBeenCalled();
  });

  it('should handle error and show error toast when quiz creation fails', () => {
    const mockFormData = new FormData();
    const mockError = { error: { message: 'Creation failed' } };
    mockAssessmentCreationService.createQuiz.and.returnValue(throwError(() => mockError));

    component.onSubmit(mockFormData);

    expect(mockAssessmentCreationService.createQuiz).toHaveBeenCalledWith(mockFormData);
    expect(mockToastService.showError).toHaveBeenCalledWith('Creation failed', 'Error');
  });
});
