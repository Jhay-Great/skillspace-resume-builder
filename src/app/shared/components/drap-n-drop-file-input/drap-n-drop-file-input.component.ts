import { Component, Input } from '@angular/core';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';

@Component({
  selector: 'app-drag-n-drop-file-input',
  standalone: true,
  imports: [],
  templateUrl: './drap-n-drop-file-input.component.html',
  styleUrl: './drap-n-drop-file-input.component.scss'
})
export class DrapNDropFileInputComponent {
  description:string = 'This is what applicants will see on your profile.'
  fileUploaded: File | null = null;
  // fileUploaded: FileList | null = null;
  previewImage:string | null = null;

  @Input () label:string | null = null;
  @Input () accept:string | null = null;

  constructor (
    private toastService: ToastService,
  ) {};

  selectFile(event:Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files
    if (!file) return;
    this.handleFile(file[0]);
  }

  onDragOver(event:DragEvent) {
    this.resetDefaultBrowserSettings(event);
    const container = event.currentTarget as HTMLElement;
    container.classList.add('on-drag');
  };
  onDragLeave(event:DragEvent) {
    this.resetDefaultBrowserSettings(event);
    const container = event.currentTarget as HTMLElement;
    container.classList.remove('on-drag');
  };
  onDrop(event:DragEvent) {
    this.resetDefaultBrowserSettings(event);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      // this.fileUploaded = files;
      console.log(this.fileUploaded);
      this.handleFile(files[0]);
    }
  };

  private handleFile(file: File): void {
    if (file.type.startsWith('image/')) {
      this.fileUploaded = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      // handle error response or feedback here
      this.toastService.showError('Failed to upload', 'Incompatible file uploaded');
      console.log('Please upload only image files.');
    }
  }

  remove() {
    this.fileUploaded = null;
  }

  private resetDefaultBrowserSettings (event:Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
