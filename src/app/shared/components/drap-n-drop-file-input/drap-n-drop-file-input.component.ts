import { Component, ElementRef, EventEmitter, Input, Output, viewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';

@Component({
  selector: 'app-drag-n-drop-file-input',
  standalone: true,
  imports: [],
  templateUrl: './drap-n-drop-file-input.component.html',
  styleUrl: './drap-n-drop-file-input.component.scss',
})
export class DrapNDropFileInputComponent implements OnChanges {
  description = 'This is what applicants will see on your profile.';
  fileUploaded = false;
  previewImage: string | null = null;
  dropZone = viewChild<ElementRef>('DragNDropZone');

  @Input() label: string | null = null;
  @Input() accept: string | null = null;
  @Input() previewUpload: string | null = null;
  @Output() uploadedFile = new EventEmitter<File | null>();

  constructor(private toastService: ToastService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['previewUpload']) {
      this.previewImage = changes['previewUpload'].currentValue;
      this.fileUploaded = true;
    }
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

  private handleFile(file: File): void {
    if (file.type.startsWith('image/')) {
      this.fileUploaded = true;
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.previewImage = e.target?.result as string;
        this.uploadedFile.emit(file);
      };
      reader.readAsDataURL(file);
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
