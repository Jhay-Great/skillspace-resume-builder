import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { take } from 'rxjs';
import { Programme, ProgrammeChangeHistory, Quiz, QuizResponse } from '@src/app/core/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProgrammeService {
  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) {}

  allProgrammes: Programme[] = [];
  allQuizzes!: Quiz[];
  updatingProgram = false;
  duplicatingProgram = false;
  currentUpdatingProgram: Programme | null = null;
  changesHistory!: ProgrammeChangeHistory[] 

  // programme to move or delete
  programmeToMoveOrDelete!: Programme;

  // Toast notification
  private successToast(message: string = 'Programme created successfully') {
    this.toastService.showSuccess('Congratulations', message, 'top-right');
  }
  private showError(message: string) {
    this.toastService.showError('Error', message, 'top-right');
  }
  // create program
  createProgram(data: Programme) {
    // save to server
    this.http
      .post(environment.COMPANY_PROGRAMMES_BASE_API + environment.CREATE_PROGRAM_ENDPOINT, data)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.getPrograms();
          this.successToast();
          // add to local save
          this.allProgrammes.unshift(data);
        },
        error: (error) => {
          this.showError(error.error.message);
        },
      });
  }

  // get all programmes
  getPrograms() {
    this.http
      .get<Programme[]>(environment.COMPANY_PROGRAMMES_BASE_API + environment.GET_ALL_PROGRAMMES)
      .pipe(take(1))
      .subscribe((data) => {
        this.allProgrammes = data;
        console.log(this.allProgrammes);
      });
  }
  // get all quizes(assesment for badges)
  getQuizes() {
    this.http
      .get<QuizResponse>(environment.COMPANY_PROGRAMMES_BASE_API + environment.GET_ALL_QUIZZES)
      .pipe(take(1))
      .subscribe((data) => {
        this.allQuizzes = data.data.content;
      });
  }

  // get draft programmes
  draftProgram() {
    return this.allProgrammes.filter((programme: Programme) => programme.status === 'DRAFT');
  }

  // get published programmes
  publishedProgram() {
    return this.allProgrammes.filter((programme: Programme) => programme.status === 'PUBLISHED');
  }

  // publish programmes
  publishProgram(id: number, programme: Programme) {
    const programmeData = programme;
    // make api call
    this.http.put(environment.BASE_API + environment.PUBLISH_PROGRAMME + `${id}/publish`, programmeData);
    // update the status in the ui
    this.allProgrammes.map((programme: Programme) => {
      if (programme.id === programmeData.id) {
        programme.status = 'PUBLISHED';
      }
    });

    this.successToast('Programme published successfully');
  }

  // move to draft
  moveToDraft(id: number) {
    this.allProgrammes.map((programme: Programme) => {
      if (programme.id === id) {
        programme.status = 'DRAFT';
      }
    });
  }

  // update programmes
  updateProgram(id: number | null, data: Programme) {
    // duplicating a program
    if (this.duplicatingProgram) {
      const duplicatedData = { ...data };
      duplicatedData.status = 'DRAFT';
      this.createProgram(duplicatedData);
      this.duplicatingProgram = false;
      return;
    }

    const changedFields: string[] = [];
    const dataToSend = {
      programs: data,
    };

    let changesMade = 'Changed: ';

    if (this.currentUpdatingProgram) {
      const previous = this.currentUpdatingProgram;

      this.allProgrammes.forEach((programme: Programme) => {
        if (programme.id === id) {
          // Compare fields and track changes
          Object.keys(data).forEach((key) => {
            if (
              key in previous && // Ensure key exists in previous
              data[key as keyof Programme] !== previous[key as keyof Programme] && // Strict comparison
              !(data[key as keyof Programme] == null && previous[key as keyof Programme] == null) // Handle null/undefined
            ) {
              changedFields.push(key);
            }
          });

          // Update the programme with new data
          Object.assign(programme, data); // Only update the matching program
        }
      });
      console.log(changedFields);
    }

    // check if status is published then add changes made
    if (data.status === 'PUBLISHED') {
      changedFields.forEach((field) => {
        changesMade += `${field}, `;
      });
      Object.assign(dataToSend, { changeDescription: changesMade });
    }
    // make api call to update program
    this.http
      .put(environment.BASE_API + environment.UPDATE_PROGRAMME + `${id}`, dataToSend)
      .pipe(take(1))
      .subscribe({
        next: (_data) => {
          this.successToast('Programme updated successfully');
        },
        error: (error) => {
          this.showError(error.error.message);
        },
      });
    // set updating to false
    this.updatingProgram = false;
  }

  // delete program
  deleteProgramme(id: number, _programme: Programme) {
    // make api call
    this.http
      .delete(environment.BASE_API + environment.DELETE_PROGRAMME + `${id}`)
      .pipe(take(1))
      .subscribe({
        next: (_data) => {
          this.successToast('Programme deleted successfully');
          this.allProgrammes = this.allProgrammes.filter((programme: Programme) => programme.id !== id);
        },
        error: (error) => {
          this.showError(error.error.message);
        },
      });
  }
}
