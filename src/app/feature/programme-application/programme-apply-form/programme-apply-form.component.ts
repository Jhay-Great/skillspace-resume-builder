import { Component } from '@angular/core';
// import components
import { TagComponent } from '@src/app/shared/components/tag/tag.component';
// import prime ng modules
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
// import form modules
import { FormGroup,ReactiveFormsModule,FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-programme-apply-form',
  standalone: true,
  imports: [TagComponent,ReactiveFormsModule,InputTextModule,CalendarModule,CheckboxModule],
  templateUrl: './programme-apply-form.component.html',
  styleUrl: './programme-apply-form.component.scss'
})
export class ProgrammeApplyFormComponent {

  applyForm!:FormGroup

  constructor(private fb: FormBuilder) {
    this.applyForm = this.fb.group({
      interest: ['', Validators.required],
      startDate: ['', Validators.required],
      confirmation: ['', Validators.required],
      agree: ['', Validators.required]
    })
  }

}
