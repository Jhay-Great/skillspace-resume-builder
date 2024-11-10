import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadInputFieldComponent } from './file-upload-input-field.component';

describe('FileUploadInputFieldComponent', () => {
  let component: FileUploadInputFieldComponent;
  let fixture: ComponentFixture<FileUploadInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadInputFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileUploadInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
