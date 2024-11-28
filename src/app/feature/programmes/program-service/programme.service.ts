import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { map, Observable } from 'rxjs';
import { Programme } from '@src/app/core/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProgrammeService {
  constructor(private http: HttpClient, private toastService: ToastService) {}

  allProgrammes: Programme[] = [];
  updatingProgram = false;
  currentUpdatingProgram: Programme | null = null;

  // programme to move or delete
  programmeToMoveOrDelete!: Programme;

  // Toast notification
  private successToast() {
    this.toastService.showSuccess(
      'Congratulations',
      'Career programme has been successfully added',
      'top-right'
    );
  }
  private showError() {
    this.toastService.showError(
      'Error',
      'Something went wrong. Please try again',
      'top-right'
    );
  }
  // create program
  createProgram(data: Programme) {
    // save to server
    this.http
      .post(
        environment.COMPANY_PROGRAMMES_BASE_API +
          environment.CREATE_PROGRAM_ENDPOINT,
        data
      )
      .subscribe({
        next: () => {
          this.getPrograms();
          this.successToast();
          // add to local save
          this.allProgrammes.unshift(data);
        },
        error: (_error) => {
          this.showError();
        },
      });
  }

  // get all programmes
  getPrograms() {
    this.http
      .get<Programme[]>(
        environment.COMPANY_PROGRAMMES_BASE_API + environment.GET_ALL_PROGRAMMES
      )
      .subscribe((data) => {
        console.log(data);
        this.allProgrammes = data;
      });
  }

  // get draft programmes
  draftProgram() {
    return this.allProgrammes.filter(
      (programme: Programme) => programme.status === 'DRAFT'
    );
  }

  // get published programmes
  publishedProgram() {
    return this.allProgrammes.filter(
      (programme: Programme) => programme.status === 'PUBLISHED'
    );
  }

  // publish programmes
  publishProgram(id: number, programme: Programme) {
    const programmeData = programme;
    // make api call
    this.http
      .put(
        environment.BASE_API + environment.PUBLISH_PROGRAMME + `${id}/publish`,
        programmeData
      )
      .subscribe({
        next: (_data) => {
          console.log('programme successfully added');
        },
        error: (error) => {
          console.log(error);
        },
      });
    this.allProgrammes.map((programme: Programme) => {
      if (programme.id === programmeData.id) {
        programme.status = 'PUBLISHED';
      }
    });
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
  updateProgram(id: number, data: Programme) {
    this.allProgrammes.map((programme: Programme) => {
      if (programme.id === id) {
        Object.assign(programme, data);
      }
    });
    // make api call to update program
  }

  // delete program
  deleteProgramme(id: number, programme: Programme) {
    // make api call
    this.http
      .delete(environment.BASE_API + environment.DELETE_PROGRAMME + `${id}`)
      .subscribe({
        next: (_data) => {
          console.log('programme successfully deleted');
        },
        error: (error) => {
          console.log(error);
        },
      });
    this.allProgrammes = this.allProgrammes.filter(
      (programme: Programme) => programme.id !== id
    );
    // make api call to delete program
  }
}
