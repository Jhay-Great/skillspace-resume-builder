import { Component, EventEmitter, Output } from '@angular/core';
// programme service
import { ProgrammeApplicationService } from '../programme-application-service/programme-application.service';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
// import components
import { TagComponent } from '@src/app/shared/components/tag/tag.component';
// import prime ng modules
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
// import form modules
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs';
@Component({
  selector: 'app-programme-apply-form',
  standalone: true,
  imports: [TagComponent, ReactiveFormsModule, InputTextModule, CalendarModule, CheckboxModule],
  templateUrl: './programme-apply-form.component.html',
  styleUrl: './programme-apply-form.component.scss',
})
export class ProgrammeApplyFormComponent {
  applyForm!: FormGroup;
  @Output() closeForm = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private programmeApplicationService: ProgrammeApplicationService,
    private toastService: ToastService
  ) {
    this.applyForm = this.fb.group({
      interest: ['', Validators.required],
      startDate: ['', Validators.required],
      confirmation: ['', Validators.required],
      agree: ['', Validators.required],
    });
  }

  onSubmit() {
    this.programmeApplicationService
      .applyForProgramme(this.programmeApplicationService.currentlyViewingProgramme.id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.toastService.showSuccess('Congratulations', 'Application submitted successfully');
        },
        error: (error) => {
          console.log(error);
          
          this.toastService.showError('Error', error.error.message);
        },
      });
    this.close();
  }

  // close form
  close() {
    this.closeForm.emit();
  }
}
