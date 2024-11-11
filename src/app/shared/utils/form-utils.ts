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
