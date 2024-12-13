import { TestBed } from '@angular/core/testing';

import { AssessmentCreationService } from './assessment-creation.service';

describe('AssessmentCreationService', () => {
  let service: AssessmentCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessmentCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show create quiz modal', () => {
    service.showCreateQuizModal();
    expect(service.createQuizVisible()).toBe(true);
    expect(service.updateQuizVisible()).toBe(false);
  });

  it('should show update quiz modal', () => {
    service.showUpdateQuizModal();
    expect(service.updateQuizVisible()).toBe(true);
    expect(service.createQuizVisible()).toBe(false);
  });

  it('should close all quiz modals', () => {
    service.showCreateQuizModal();
    service.closeQuizModals();
    expect(service.createQuizVisible()).toBe(false);
    expect(service.updateQuizVisible()).toBe(false);
  });
});
