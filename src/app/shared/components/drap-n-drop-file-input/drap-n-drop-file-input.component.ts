import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges  } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { ToastService } from '@src/app/core/services/toast-service/toast.service';

@Component({
  selector: 'app-drag-n-drop-file-input',
  standalone: true,
  imports: [],
  templateUrl: './drap-n-drop-file-input.component.html',
  styleUrl: './drap-n-drop-file-input.component.scss'
})
export class DrapNDropFileInputComponent implements OnChanges  {
  description:string = 'This is what applicants will see on your profile.'
  fileUploaded: File | null = null;
  previewImage:string | null = null;

  @Input () label:string | null = null;
  @Input () accept:string | null = null;
  @Input () valueFromServer:string | null = null;
  @Output () uploadedFile = new EventEmitter<File | null>()

  constructor (
    private toastService: ToastService,
    private sanitizer: DomSanitizer
  ) {};

  ngOnInit():void {
    // console.log('value from server: ', this.valueFromServer);
    if (this.valueFromServer) {
      this.previewImage = this.valueFromServer;
    }
  }
  
    ngOnChanges(changes: SimpleChanges): void {
    if (changes['valueFromServer'] && changes['valueFromServer'].currentValue) {
      this.previewImage = this.valueFromServer; // Update previewImage when the input changes
      // this.fileUploaded = true;
      console.log('Value from server updated:', this.previewImage);
    }
  }
  // ngOnChanges(changes: SimpleChanges) {
  //     console.log('value from server: ', this.valueFromServer);
  //   // Check if existingImage input has changed
  //   if (changes['valueFromServer'] && this.valueFromServer) {
  //     this.setExistingImagePreview(this.valueFromServer);
  //   }
  // }

  //   private setExistingImagePreview(imageUrl: string) {
  //   // Sanitize the image URL to prevent security issues
  //   this.previewImage = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  //   this.fileUploaded = null; // Reset fileUploaded as this is an existing image
  // }

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
      this.handleFile(files[0]);
    }
  };

  private handleFile(file: File): void {
    if (file.type.startsWith('image/')) {
      this.fileUploaded = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
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
    this.fileUploaded = null;
  }

  private resetDefaultBrowserSettings (event:Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
