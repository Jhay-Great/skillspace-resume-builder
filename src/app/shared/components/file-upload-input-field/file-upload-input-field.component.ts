import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-upload-input-field',
  standalone: true,
  imports: [],
  templateUrl: './file-upload-input-field.component.html',
  styleUrl: './file-upload-input-field.component.scss'
})
export class FileUploadInputFieldComponent {
  @Input() label:string | null = null;
  @Input () acceptType:string | null = null;
  @Input () svgIconPath: string | null = null;
  @Input() defaultPlaceholder: string = 'File must be a PDF';
  @Output() fileSelected = new EventEmitter<File | null>();
  
    placeholder = 'File must be a PDF'
    selectedFile:string | null = null;

    constructor () {};

    onUploadFile(event: Event) {
      const target = event.target as HTMLInputElement;
      if(target.files && target.files.length > 0) {
        const file = target.files[0]
        this.selectedFile = file.name;
        this.defaultPlaceholder = this.selectedFile;
        this.fileSelected.emit(file);
      }else {
        this.selectedFile = null;
        this.fileSelected.emit(null);
      }
    }

  onUpload(event:any) {
    const file = event.target.files[0];
    if (file) {
      this.placeholder = file.name;
      
    }
  }

}
