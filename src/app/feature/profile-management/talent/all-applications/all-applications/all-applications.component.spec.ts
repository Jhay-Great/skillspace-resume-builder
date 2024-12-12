import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllApplicationsComponent } from './all-applications.component';

describe('AllApplicationsComponent', () => {
  let component: AllApplicationsComponent;
  let fixture: ComponentFixture<AllApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllApplicationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
