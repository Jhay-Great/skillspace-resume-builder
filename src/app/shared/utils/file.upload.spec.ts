import { TestBed } from '@angular/core/testing';
import { extractFilename, createFromData } from './file-upload';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('file upload methods', () => {
  let fb: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
    });

    fb = TestBed.inject(FormBuilder);
  });

  it('should set up the value for the form', () => {
    const form = fb.group({
      file: [null as File | null],
    });
    const file = new File([], 'test.txt');
    form.patchValue({ file });
    expect(form.get('file')?.value).toBe(file);
  });

  it('should create a formData from the data entered', () => {
    const formData = {
      name: 'username',
      email: 'u@usermail.com',
      number: '+233 243 2328',
    };
    const result = createFromData(formData);
    expect(result).toBeInstanceOf(FormData);
    expect(result?.get('name')).toBe('username');
  });

  it('should extract filename from string url', () => {
    const url = 'http://localhost:4200/something.com_falaaa';
    const filename = extractFilename(url);
    expect(url).toBe(filename);
  });
});
