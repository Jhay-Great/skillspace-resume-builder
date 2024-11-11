import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerCreationFormComponent } from './career-creation-form.component';

describe('CareerCreationFormComponent', () => {
  let component: CareerCreationFormComponent;
  let fixture: ComponentFixture<CareerCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerCreationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CareerCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
