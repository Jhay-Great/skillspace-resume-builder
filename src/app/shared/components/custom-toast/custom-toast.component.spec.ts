import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomToastComponent } from './custom-toast.component';

describe('CustomToastComponent', () => {
  let component: CustomToastComponent;
  let fixture: ComponentFixture<CustomToastComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomToastComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomToastComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    
    // Set default input values
    component.severity = 'success-toast';
    component.summary = 'Test Summary';
    component.detail = 'Test Detail';
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getToastType', () => {
    it('should return error-toast for error severity', () => {
      component.severity = 'error-toast';
      expect(component.getToastType()).toBe('error-toast');
    });

    it('should return success-toast for success severity', () => {
      component.severity = 'success-toast';
      expect(component.getToastType()).toBe('success-toast');
    });

    it('should return warning-toast for any other severity', () => {
      component.severity = 'warning-toast';
      expect(component.getToastType()).toBe('warning-toast');
    });
  });

  describe('getToastIcon', () => {
    it('should return pi-info-circle for error severity', () => {
      component.severity = 'error-toast';
      expect(component.getToastIcon()).toBe('pi-info-circle');
    });

    it('should return pi-check-circle for success severity', () => {
      component.severity = 'success-toast';
      expect(component.getToastIcon()).toBe('pi-check-circle');
    });

    it('should return pi-info-circle for warning severity', () => {
      component.severity = 'warning-toast';
      expect(component.getToastIcon()).toBe('pi-info-circle');
    });
  });

  describe('template rendering', () => {
    beforeEach(() => {
      component.severity = 'success-toast';
      component.summary = 'Test Summary';
      component.detail = 'Test Detail';
      fixture.detectChanges();
    });

    it('should display the summary text', () => {
      const summaryElement = element.querySelector('.status p');
      expect(summaryElement?.textContent).toContain('Test Summary');
    });

    it('should display the detail text', () => {
      const detailElement = element.querySelector('.content');
      expect(detailElement?.textContent?.trim()).toBe('Test Detail');
    });

    it('should apply the correct toast type class', () => {
      const toastElement = element.querySelector('.custom-toast');
      expect(toastElement?.classList.contains('success-toast')).toBeTruthy();
    });

    it('should display the correct icon class', () => {
      const iconElement = element.querySelector('.pi');
      expect(iconElement?.classList.contains('pi-check-circle')).toBeTruthy();
    });
  });
});