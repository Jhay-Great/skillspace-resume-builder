import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

// local imports
import { PageHeaderDescriptionComponent } from '../../../../shared/components/page-header-description/page-header-description.component';

// local imports
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';

// primeng modules
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
// import { InputTextModule } from 'primeng/inputtext';

import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-profile-management',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    TabViewModule,
    ButtonModule,
    PageHeaderDescriptionComponent,
    InputFieldComponent,
  ],
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.scss',
})
export class ProfileManagementComponent {
  description:string = 'This is what applicants will see on your profile.'
  fileUploaded: FileList | null = null;
  previewImage:string | null = null;

  constructor () {};

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
      this.fileUploaded = files;
      console.log(this.fileUploaded);
      this.handleFile(files[0]);
    }
  };

  private handleFile(file: File): void {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      // handle error response or feedback here
      console.log('Please upload only image files.');
    }
  }

  private resetDefaultBrowserSettings (event:Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
