import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtpVerificationComponent } from './otp-verification.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CapitalizePipe } from '../../../core/pipes/capitalize/capitalize.pipe';
import { InputOtpModule } from 'primeng/inputotp';
import { By } from '@angular/platform-browser';

describe('OtpVerificationComponent', () => {
  let component: OtpVerificationComponent;
  let fixture: ComponentFixture<OtpVerificationComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ButtonModule,
        InputOtpModule,
        OtpVerificationComponent,
      ],
      providers: [
        FormBuilder,
        {
          provide: CapitalizePipe,
          useValue: {
            transform: (value: string) => value.toUpperCase(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OtpVerificationComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should initialize the form with empty verification code', () => {
      expect(component.verificationForm.get('verificationCode')?.value).toBe('');
    });

    it('should have verificationCode control with required validator', () => {
      const control = component.verificationForm.get('verificationCode');
      expect(control?.hasValidator(Validators.required)).toBeTruthy();
    });
  });

  describe('Form Validation', () => {
    it('should mark form as invalid when verification code is empty', () => {
      const control = component.verificationForm.get('verificationCode');
      control?.setValue('');
      expect(component.verificationForm.valid).toBeFalsy();
    });

    it('should mark form as valid when verification code is provided', () => {
      const control = component.verificationForm.get('verificationCode');
      control?.setValue('12345');
      expect(component.verificationForm.valid).toBeTruthy();
    });

    it('should show error message when verification code is touched and empty', () => {
      const control = component.verificationForm.get('verificationCode');
      control?.setValue('');
      control?.markAsTouched();
      fixture.detectChanges();

      const errorMessage = component.getErrorMessage('verificationCode');
      expect(errorMessage).toBeTruthy();
    });
  });

  describe('Form Submission', () => {
    it('should emit verification code when form is valid and submitted', () => {
      spyOn(component.onVerify, 'emit');
      const verificationCode = '12345';
      
      component.verificationForm.get('verificationCode')?.setValue(verificationCode);
      component.onSubmit();

      expect(component.onVerify.emit).toHaveBeenCalledWith(verificationCode);
    });

    it('should not emit verification code when form is invalid and submitted', () => {
      spyOn(component.onVerify, 'emit');
      
      component.verificationForm.get('verificationCode')?.setValue('');
      component.onSubmit();

      expect(component.onVerify.emit).not.toHaveBeenCalled();
    });

    it('should set loading state during form submission', () => {
      component.verificationForm.get('verificationCode')?.setValue('12345');
      component.onSubmit();

      expect(component.verificationLoading).toBeTruthy();
    });

    it('should mark all fields as touched when submitting invalid form', () => {
      component.verificationForm.get('verificationCode')?.setValue('');
      component.onSubmit();

      expect(component.verificationForm.get('verificationCode')?.touched).toBeTruthy();
    });
  });

  describe('Loading State', () => {
    it('should update loading status when setLoadingStatus is called', () => {
      component.setLoadingStatus(true);
      expect(component.verificationLoading).toBeTruthy();

      component.setLoadingStatus(false);
      expect(component.verificationLoading).toBeFalsy();
    });

    it('should reflect loading state in submit button', () => {
      component.setLoadingStatus(true);
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));
      expect(button.attributes['ng-reflect-loading']).toBe('true');
    });
  });

  describe('Template Rendering', () => {
    it('should render the OTP input field', () => {
      const otpInput = fixture.debugElement.query(By.css('p-inputOtp'));
      expect(otpInput).toBeTruthy();
    });

    it('should render the verify button', () => {
      const button = fixture.debugElement.query(By.css('.verify-btn button'));
      expect(button).toBeTruthy();
    });

    it('should add invalid-input class when verification code is invalid and touched', () => {
      const control = component.verificationForm.get('verificationCode');
      control?.setValue('');
      control?.markAsTouched();
      fixture.detectChanges();

      const otpInput = fixture.debugElement.query(By.css('p-inputOtp'));
      expect(otpInput.classes['invalid-input']).toBeTruthy();
    });

    it('should show logo image', () => {
      const logo = fixture.debugElement.query(By.css('.logo img'));
      expect(logo).toBeTruthy();
      expect(logo.attributes['src']).toBe('assets/svgs/blue-skillspace-logo.svg');
    });
  });

  describe('Error Messages', () => {
    it('should return appropriate error message for required field', () => {
      const control = component.verificationForm.get('verificationCode');
      control?.setValue('');
      control?.markAsTouched();

      const errorMessage = component.getErrorMessage('verificationCode');
      expect(errorMessage).toBeTruthy();
    });

    it('should not show error message when field is valid', () => {
      const control = component.verificationForm.get('verificationCode');
      control?.setValue('12345');
      control?.markAsTouched();

      const errorMessage = component.getErrorMessage('verificationCode');
      expect(errorMessage).toBeFalsy();
    });
  });
});