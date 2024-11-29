import { FormGroup, } from "@angular/forms";

export const onFileUpload = function(form:FormGroup, file: File | null, control: string) {
    if (file) {
      form.get(control)?.setValue(file);
    }
}