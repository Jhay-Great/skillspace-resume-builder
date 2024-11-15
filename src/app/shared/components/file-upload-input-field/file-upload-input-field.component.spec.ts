import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

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

  it('should update selectedFile when a file is selected', () => {
    const mockFile = new File(['content'], 'example.txt', { type: 'text/plain' });
    const mockEvent = { target: { files: [mockFile] } } as unknown as Event;

    component.onUploadFile(mockEvent);
    expect(component.selectedFile).toBe('example.txt');
  });

  it('should set selectedFile to null when no file is selected', () => {
    const mockEvent = { target: { files: [] } } as unknown as Event;

    component.onUploadFile(mockEvent);
    expect(component.selectedFile).toBeNull();
  });

  it('should emit the selected file when a file is selected', () => {
    spyOn(component.fileSelected, 'emit');
    const mockFile = new File(['content'], 'example.txt', { type: 'text/plain' });
    const mockEvent = { target: { files: [mockFile] } } as unknown as Event;

    component.onUploadFile(mockEvent);
    expect(component.fileSelected.emit).toHaveBeenCalledWith(mockFile);
  });

  it('should emit null when no file is selected', () => {
    spyOn(component.fileSelected, 'emit');
    const mockEvent = { target: { files: [] } } as unknown as Event;

    component.onUploadFile(mockEvent);
    expect(component.fileSelected.emit).toHaveBeenCalledWith(null);
  });
  
});
