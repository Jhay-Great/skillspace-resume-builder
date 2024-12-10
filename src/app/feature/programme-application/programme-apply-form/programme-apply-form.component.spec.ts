import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeApplyFormComponent } from './programme-apply-form.component';

describe('ProgrammeApplyFormComponent', () => {
  let component: ProgrammeApplyFormComponent;
  let fixture: ComponentFixture<ProgrammeApplyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeApplyFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgrammeApplyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
