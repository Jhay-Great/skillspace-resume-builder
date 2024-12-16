import { Component, ElementRef, viewChild, input, output, effect } from '@angular/core';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { EllipsisPipe } from '@core/pipes/truncate-with-ellipsis/ellipsis.pipe';
import { extractFilename } from '../../utils/file-upload';

@Component({
  selector: 'app-drag-n-drop-file-input',
  standalone: true,
  imports: [EllipsisPipe],
  templateUrl: './drap-n-drop-file-input.component.html',
  styleUrl: './drap-n-drop-file-input.component.scss',
})
export class DrapNDropFileInputComponent {
  description = 'This is what applicants will see on your profile.';
  fileUploaded = false;
  previewImage: string | null | undefined = null;
  filename: string | null = null;
  dropZone = viewChild<ElementRef>('DragNDropZone');
  label = input.required<string | null>();
  accept = input.required<string | null>();
  previewUpload = input<string | null>();
  uploadedFile = output<File | null>();

  constructor(private toastService: ToastService) {
    effect(() => {
      this.previewImage = this.previewUpload();
      this.fileUploaded = true;
      if (this.previewImage) {
        this.filename = extractFilename(this.previewImage);
      }
    });
  }

  selectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files;
    if (!file) return;
    this.handleFile(file[0]);
  }

  onDragOver(event: DragEvent) {
    this.resetDefaultBrowserSettings(event);
    const container = event.currentTarget as HTMLElement;
    container.classList.add('on-drag');
  }
  onDragLeave(event: DragEvent) {
    this.resetDefaultBrowserSettings(event);
    const container = event.currentTarget as HTMLElement;
    container.classList.remove('on-drag');
  }
  onDrop(event: DragEvent) {
    this.resetDefaultBrowserSettings(event);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  displayFilename(file: File) {
    this.filename = file.name;
  }

  private handleFile(file: File): void {
    if (file.type.startsWith('image/')) {
      this.fileUploaded = true;
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.previewImage = e.target?.result as string;
        this.displayFilename(file);
        this.uploadedFile.emit(file);
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('application/pdf')) {
      this.fileUploaded = true;
      this.displayFilename(file);
      this.previewImage = file.name;
      this.uploadedFile.emit(file);
    } else {
      // handle error response or feedback here
      this.toastService.showError('Failed to upload', 'Incompatible file uploaded');
      this.uploadedFile.emit(null);
    }
  }

  remove() {
    this.fileUploaded = false;
    const element = this.dropZone()?.nativeElement;
    element.value = null;
  }

  private resetDefaultBrowserSettings(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
