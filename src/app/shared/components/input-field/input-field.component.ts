import { Component, ElementRef, Input, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

// interface
type RegisterOnChange = (value: string) => void;
type RegisterOnTouch = () => void;

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) svgIcon: string | null = null;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) type: string | null = null;
  @Input({ required: true }) placeholder: string | null = null;
  @Input() hasError = false;
  @Input() isDisabled = false;

  @ViewChild('Input') inputElement!: ElementRef;

  value = '';
  isVisible = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: RegisterOnChange = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: RegisterOnTouch = () => {};

  ngOnInit() {
    // for components that doesn't have a form control name
    if (this.isDisabled && this.type === 'password') {
      this.value = '.......,,#';
      return;
    }
  }

  // for writing values to this component
  writeValue(value: string | null): void {
    if (this.isDisabled && this.type === 'password') {
      this.value = '.......,,#'; // for prefill old password field with values
      return;
    }
    this.value = value || '';
    if (this.inputElement) {
      this.inputElement.nativeElement.value = this.value;
    }
  }

  // used to register changes that occurs in the component
  registerOnChange(fn: RegisterOnChange): void {
    this.onChange = fn;
  }

  // register changes when the field is touched
  registerOnTouched(fn: RegisterOnTouch): void {
    this.onTouched = fn;
  }

  // Emit changes to the form control
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }

  togglePasswordVisibility(): void {
    const input = this.inputElement.nativeElement;
    input.type = input.type === 'password' ? 'text' : 'password';
    this.isVisible = !this.isVisible;
  }
}
