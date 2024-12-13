import { FormGroup } from '@angular/forms';

export function getFormErrorMessage(controlName: string, form: FormGroup): string {
  const control = form.get(controlName);

  // Check for 'required' error
  if (control?.hasError('required') && control.touched) {
    return `${controlName} is required!`;
  }

  // Check for errors that are specific
  if (control?.hasError('email') && control.touched) {
    return 'Invalid email format!';
  }

  return '';
}

export const getFormControl = function (form: FormGroup, controlName: string) {
  return form.get(controlName);
};

export const hasFormError = function (form: FormGroup, controlName: string, errorKey: string): string | null {
  if (form.get(controlName)?.touched) {
    if (form.get(controlName)?.errors?.['required']) {
      return 'This field is required';
    } else if (form.errors?.[errorKey] && form.get(controlName)?.dirty) {
      return 'Confirm password is invalid';
    }
  }
  return null;
};

export const hasError = function (form: FormGroup, controlName: string) {
  const control = form.get(controlName);

  if (control?.touched && control.errors) {
    if (control.errors['required']) {
      return 'This field is required';
    }
    if (control?.errors?.['email']) {
      return 'Email is invalid';
    }
    if (controlName.toLowerCase().includes('password') && control?.errors?.['minlength']) {
      return 'Password length should be at least 8 characters long';
    }
    if (controlName.toLowerCase().includes('password') && control?.errors?.['weakPassword']) {
      return 'Password should contain numbers, symbols, and uppercase or lowercase letters';
    }
  }
  return null;
};

export const extractUpdatedFields = function <T extends object>(formData: T, initialData: T): Partial<T> {
  const differences: Partial<T> = {};

  for (const key in formData) {
    if (formData[key] !== initialData[key]) {
      differences[key] = formData[key];
    }
  }

  return differences;
};
