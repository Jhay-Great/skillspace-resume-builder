import { FormGroup, } from "@angular/forms";

export const onFileUpload = function(form:FormGroup, file: File | null, control: string) {
    if (file) {
      form.get(control)?.setValue(file);
    }
}

export const createFromData = function <T>(data: Record<string, T>) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (typeof value === 'string') {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, JSON.stringify(value));
    }
  });

  return formData;
}