import { ValidationErrors, ValidatorFn, AbstractControl } from "@angular/forms";

export const confirmPasswordValidator = ():ValidatorFn => {
    return (control:AbstractControl):ValidationErrors | null => {

        const password = control.get('credential.password');
        const confirmPassword = control.get('credentials.confirmPassword');

        if(!password || !confirmPassword) return null;

        
        return password.value === confirmPassword.value ? null : { passwordMismatch: true };
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