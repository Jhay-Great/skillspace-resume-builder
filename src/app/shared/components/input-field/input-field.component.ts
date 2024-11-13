import { Component, ElementRef, Input, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    },
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent implements OnInit, ControlValueAccessor {
  @Input ({required: true}) svgIcon:string | null = null;
  @Input ({required: true}) label!:string;
  @Input ({required: true}) type:string | null = null;
  @Input ({required: true}) placeholder:string | null = null;
  @Input () hasError:boolean = false;

  @ViewChild ('Input') inputElement!:ElementRef;

  value:string = '';
  onChange = (value:string) => {};
  onTouched = () => {};

  constructor () {}

  ngOnInit() {

  }

  onInputChange(value:string) {
    this.value = value;
    this.onChange(value);
  }

  // for writing values to this component
  writeValue(value: any): void {
    this.value = value || ''
  }

  // used to register changes that occurs in the component
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // register changes when the field is touched
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  // called when the form control is enabled and disabled
  setDisabledState(isDisabled: boolean): void {
    
  }

  // Emit changes to the form control
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  togglePasswordVisibility(): void {
    const input = this.inputElement.nativeElement
    input.type = input.type === 'password' ? 'text' : 'password';
  }



}
