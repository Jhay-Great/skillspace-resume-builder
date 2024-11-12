import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtpVerificationComponent } from './otp-verification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { ButtonModule } from 'primeng/button';
import { CapitalizePipe } from '../../../core/pipes/capitalize/capitalize.pipe';

describe('OtpVerificationComponent', () => {
  let component: OtpVerificationComponent;
  let fixture: ComponentFixture<OtpVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OtpVerificationComponent,
        FormsModule,
        ReactiveFormsModule,
        InputOtpModule,
        ButtonModule,
        CapitalizePipe
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when a verification code is provided', () => {
    const verificationCodeInput = fixture.nativeElement.querySelector('input[formControlName="verificationCode"]');
    verificationCodeInput.value = '12345';
    verificationCodeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.verificationForm.valid).toBeTrue();
  });

  it('should have an invalid form when a verification code is not provided', () => {
    const verificationCodeInput = fixture.nativeElement.querySelector('input[formControlName="verificationCode"]');
    verificationCodeInput.value = '';
    verificationCodeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.verificationForm.valid).toBeFalse();
  });

  it('should display an error message when the verification code is invalid', () => {
    const verificationCodeInput = fixture.nativeElement.querySelector('input[formControlName="verificationCode"]');
    verificationCodeInput.value = '1234';
    verificationCodeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.text-warning');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Verification code is required');
  });

  it('should call onSubmit() when the submit button is clicked', () => {
    spyOn(component, 'onSubmit');

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();

    expect(component.onSubmit).toHaveBeenCalled();
  });
});