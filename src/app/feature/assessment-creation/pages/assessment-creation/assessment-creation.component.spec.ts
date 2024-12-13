import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationService } from 'primeng/api';
import { AssessmentCreationComponent } from '../../pages/assessment-creation/assessment-creation.component';
import { AssessmentCreationService } from '../../services/assessment-creation/assessment-creation.service.spec';

describe('AssessmentCreationComponent', () => {
  let component: AssessmentCreationComponent;
  let fixture: ComponentFixture<AssessmentCreationComponent>;
  let mockAssessmentCreationService: jasmine.SpyObj<AssessmentCreationService>;
  let mockConfirmationService: jasmine.SpyObj<ConfirmationService>;

  beforeEach(async () => {
    mockAssessmentCreationService = jasmine.createSpyObj('AssessmentCreationService', [
      'showCreateQuizModal',
      'showUpdateQuizModal',
      'closeQuizModals',
    ]);
    mockConfirmationService = jasmine.createSpyObj('ConfirmationService', ['confirm']);

    await TestBed.configureTestingModule({
      imports: [AssessmentCreationComponent],
      providers: [
        { provide: mockAssessmentCreationService, useValue: mockAssessmentCreationService },
        { provide: ConfirmationService, useValue: mockConfirmationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tab menu list on init', () => {
    expect(component.tabMenuList.length).toBe(3);
    expect(component.tabMenuList[0].label).toBe('Skills quiz');
  });

  it('should set active tab correctly', () => {
    component.setActiveTab('Local repository');
    expect(component.localRepository).toBe(true);
    expect(component.activeTabData).toBe(1);
  });

  it('should show create quiz modal', () => {
    component.showCreateQuizModal();
    expect(mockAssessmentCreationService.showCreateQuizModal).toHaveBeenCalled();
  });

  it('should return correct data based on active tab', () => {
    component.activeTabData = 1;
    const data = component.getActiveTabData();
    expect(data).toEqual(component.localRepositoryData);
  });

  it('should open tiered menu with selected quiz', () => {
    const mockQuiz = {
      id: 1,
      name: 'Test Quiz',
      location: 'Local',
      duration: '10 mins',
      passMark: '50%',
      dateCreated: '2023-01-01',
    };
    const mockEvent = new Event('click');

    component.openTieredMenu(mockEvent, mockQuiz);

    expect(component.selectedQuiz).toEqual(mockQuiz);
  });
});
