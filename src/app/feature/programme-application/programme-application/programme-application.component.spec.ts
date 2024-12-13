import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeApplicationComponent } from './programme-application.component';

describe('ProgrammeApplicationComponent', () => {
  let component: ProgrammeApplicationComponent;
  let fixture: ComponentFixture<ProgrammeApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgrammeApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
