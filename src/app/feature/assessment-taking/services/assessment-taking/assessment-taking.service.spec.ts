import { TestBed } from '@angular/core/testing';

import { AssessmentTakingService } from './assessment-taking.service';

describe('AssessmentTakingService', () => {
  let service: AssessmentTakingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessmentTakingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
