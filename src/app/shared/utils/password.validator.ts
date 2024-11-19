import { ValidationErrors, ValidatorFn, AbstractControl, FormControl } from "@angular/forms";

export const confirmPasswordValidator = (passwordControl:string, confirmPasswordControl:string):ValidatorFn => {
    return (control:AbstractControl):ValidationErrors | null => {

        const password = control.get(passwordControl)?.value;
        const confirmPassword = control.get(confirmPasswordControl)?.value;

        return password === confirmPassword ? null : { passwordMismatch: true };
        
    }
}

export const passwordStrengthValidator = ():ValidatorFn => {
    return (control:AbstractControl):ValidationErrors | null => {
        const passwordValue = control.value;

        if (!passwordValue) return null;

        const hasLowerCaseLetters = /[a-z]/.test(passwordValue);
        const hasUpperCaseLetters = /[A-Z]/.test(passwordValue);
        const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);
        const hasNumbers = /[0-9]/.test(passwordValue);

        const passwordValid = hasLowerCaseLetters && hasUpperCaseLetters && hasSpecialCharacters && hasNumbers;

        return !passwordValid ? { weakPassword: true} : null;

    }
}