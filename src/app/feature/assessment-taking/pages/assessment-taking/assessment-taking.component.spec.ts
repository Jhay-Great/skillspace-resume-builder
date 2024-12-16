import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentTakingComponent } from './assessment-taking.component';

describe('AssessmentTakingComponent', () => {
  let component: AssessmentTakingComponent;
  let fixture: ComponentFixture<AssessmentTakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentTakingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentTakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
