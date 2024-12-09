import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizFormComponent } from './quiz-form.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';

describe('QuizFormComponent', () => {
  let component: QuizFormComponent;
  let fixture: ComponentFixture<QuizFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CalendarModule,
        InputTextModule,
        InputTextareaModule,
        InputSwitchModule,
        QuizFormComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.quizForm;
    expect(form).toBeTruthy();
    expect(form.get('name')?.value).toBe('');
    expect(form.get('duration')?.value).toBe('');
    expect(form.get('passMark')?.value).toBe('');
    expect(form.get('badge')?.value).toBe('');
    expect(form.get('isGlobal')?.value).toBe(false);
    expect(form.get('questions')?.value.length).toBe(1);
  });

  it('should add a new question', () => {
    const initialLength = component.questions.length;
    component.addQuestion();
    expect(component.questions.length).toBe(initialLength + 1);
  });

  it('should add a new option to the first question', () => {
    const optionsFormArray = component.getOptions(0);
    const initialLength = optionsFormArray.length;
    component.addOption(0);
    expect(optionsFormArray.length).toBe(initialLength + 1);
  });

  it('should remove a question', () => {
    component.addQuestion(); // Add a question to ensure more than one exists
    const initialLength = component.questions.length;
    component.removeQuestion(0);
    expect(component.questions.length).toBe(initialLength - 1);
  });

  it('should handle file input and update image preview', () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const event = { target: { files: [file] } } as unknown as Event;
    component.handleFileInput(event, 0);

    expect(component.questionImages[0]).toBe(file);

    const reader = new FileReader();
    reader.onload = () => {
      expect(component.questionImagePreviews[0]).toBe(reader.result);
    };
    reader.readAsDataURL(file);
  });

  it('should emit form data on form submission', () => {
    spyOn(component.onSubmit, 'emit');
    component.quizForm.patchValue({
      name: 'Test Quiz',
      duration: '30',
      passMark: '50',
      badge: 'Gold',
      isGlobal: true,
    });
    component.onQuizSubmit();
    expect(component.onSubmit.emit).toHaveBeenCalled();
  });

  it('should discard changes and call the assessment creation service', () => {
    const discardSpy = spyOn(component['assessmentCreationService'], 'closeQuizModals');
    component.discard();
    expect(discardSpy).toHaveBeenCalled();
  });
});
