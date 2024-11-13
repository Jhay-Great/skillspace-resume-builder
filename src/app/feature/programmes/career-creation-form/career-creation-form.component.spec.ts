import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerCreationFormComponent } from './career-creation-form.component';

describe('CareerCreationFormComponent', () => {
  let component: CareerCreationFormComponent;
  let fixture: ComponentFixture<CareerCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerCreationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CareerCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with default controls', () => {
    expect(component.careerForm).toBeDefined();
    const formControls = component.careerForm.controls;
    expect(formControls['name']).toBeDefined();
    expect(formControls['requiredBadges']).toBeDefined();
    expect(formControls['optionalBadges']).toBeDefined();
    expect(formControls['startDate']).toBeDefined();
    expect(formControls['endDate']).toBeDefined();
    expect(formControls['description']).toBeDefined();
  });

  it('should add a requirement to the FormArray', () => {
    component.addRequirement();
    expect(component.requirements.length).toBe(1);
    component.addRequirement();
    expect(component.requirements.length).toBe(2);
  });

  it('should remove a requirement from the FormArray', () => {
    component.addRequirement();
    component.addRequirement();
    component.removeField(0);
    expect(component.requirements.length).toBe(1);
  });

  it('should emit closeForm event when close is called', () => {
    spyOn(component.closeForm, 'emit');
    component.close();
    expect(component.closeForm.emit).toHaveBeenCalledWith();
  });
});
