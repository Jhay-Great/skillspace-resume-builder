import { FormGroup } from '@angular/forms';

export const onFileUpload = function (form: FormGroup, file: File | null, control: string) {
  if (file) {
    form.get(control)?.setValue(file);
  }
};

export const createFromData = function <T>(data: Record<string, T>) {
  if (!data) return;
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
};

export const extractFilename = function (url: string): string {
  const filename = new URL(url).pathname.split('com_').pop() || '';
  return filename;
};

export const onDragDropUpload = function(form: FormGroup, file: File | null, controlName: string): void {
  if (file?.type === 'application/pdf') {
    onFileUpload(form, file, controlName);
    return;
  }

  if (file?.type === 'image/png') {
    onFileUpload(form, file, controlName);
    return;
  }
}
