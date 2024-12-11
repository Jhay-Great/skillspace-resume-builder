import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewedProgrammeComponent } from './viewed-programme.component';

describe('ViewedProgrammeComponent', () => {
  let component: ViewedProgrammeComponent;
  let fixture: ComponentFixture<ViewedProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewedProgrammeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewedProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
