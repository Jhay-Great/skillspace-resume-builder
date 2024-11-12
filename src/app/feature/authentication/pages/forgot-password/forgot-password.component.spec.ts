import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { RouterTestingModule } from '@angular/router/testing';
import { CapitalizePipe } from '../../../../core/pipes/capitalize/capitalize.pipe';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        IconFieldModule,
        InputIconModule,
        RouterTestingModule,
        CapitalizePipe
      ],
      providers: [ForgotPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when email is provided', () => {
    const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]')).nativeElement;
    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.forgotPasswordForm.valid).toBeTrue();
  });

  it('should have an invalid form when email is not provided', () => {
    const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]')).nativeElement;
    emailInput.value = '';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.forgotPasswordForm.valid).toBeFalse();
  });

});