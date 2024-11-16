import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldComponent } from './input-field.component';

describe('InputFieldComponent', () => {
  let component: InputFieldComponent;
  let fixture: ComponentFixture<InputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle between password and text type', () => {
    const input = fixture.nativeElement.querySelector('input');
    // initial type
    expect(input.type).toBe('password');

    component.togglePasswordVisibility();
    fixture.detectChanges();
    
    // after change
    expect(input.type).toBe('text');

    component.togglePasswordVisibility();
    fixture.detectChanges();
    
    // after change
    expect(input.type).toBe('password');
  })
  
  
});
