import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// local imports
import { PageHeaderDescriptionComponent } from '../../../../shared/components/page-header-description/page-header-description.component';

// local imports
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';

// primeng modules
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
// import { InputTextModule } from 'primeng/inputtext';

import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { DrapNDropFileInputComponent } from "../../../../shared/components/drap-n-drop-file-input/drap-n-drop-file-input.component";
import { confirmPasswordValidator, passwordStrengthValidator } from '@src/app/shared/utils/password.validator';

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
    DrapNDropFileInputComponent
],
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.scss',
})
export class ProfileManagementComponent implements OnInit {
  description:string = 'This is what applicants will see on your profile.'
  fileUploaded: FileList | null = null;
  previewImage:string | null = null;

  // form groups
  companyDetails!: FormGroup;
  documentForm!: FormGroup;
  securityForm!: FormGroup;

  constructor (
    private toastService: ToastService,
    private fb: FormBuilder,
  ) {};

  ngOnInit(): void {
    // company details form
    this.companyDetails = this.fb.group({
      name: ['', Validators.required],
      email: ['email@som.com'],
      website: ['', Validators.required],
      contact: ['', Validators.required],
      logo: [''],
    });

    // document form
    this.documentForm = this.fb.group({});

    // security form
    this.securityForm = this.fb.group({
      oldPassword: [''],
      newPassword: ['', [Validators.required, Validators.minLength, passwordStrengthValidator()]],
      confirmPassword: ['', [Validators.required]],
    }, {validators: confirmPasswordValidator('newPassword', 'confirmPassword')});
  }

  onSubmit() {
    
  }

  selectFile(event:Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files
    if (!file) return;
    this.fileUploaded = file;
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
      this.handleFile(files[0]);
    }
  };

  private handleFile(file: File): void {
    if (file.type?.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      // handle error response or feedback here
      this.toastService.showError('Failed to upload', 'Please upload only image files');
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
