import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '@src/app/core/services/toast-service/toast.service';
import { Observable } from 'rxjs';
import { Programme } from '@src/app/core/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProgrammeService {
  constructor(private http: HttpClient, private toastService: ToastService) {}

  allProgrammes: any = [];
  updatingProgram = false;
  currentUpdatingProgram: any = null;
  

  // Toast notification
  private successToast() {
    this.toastService.showSuccess(
      'Congratulations',
      'Career programme has been successfully added',
      'top-right'
    );
  }
  // create program
  createProgram(data: any) {
    // add to local save
    this.allProgrammes.unshift(data);
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
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  // get all programmes
  getPrograms() {
    this.http
      .get<Observable<Programme>>(
        environment.COMPANY_PROGRAMMES_BASE_API + environment.GET_ALL_PROGRAMMES
      )
      .subscribe((data) => (this.allProgrammes = data));
  }

  // get draft programmes
  draftProgram() {
    return this.allProgrammes.filter(
      (programme: any) => programme.status === 'DRAFT'
    );
  }

  // get published programmes
  publishedProgram() {
    return this.allProgrammes.filter(
      (programme: any) => programme.status === 'PUBLISHED'
    );
  }

  // publish programmes
  publishProgram(id: number) {
    this.allProgrammes.map((programme: any) => {
      if (programme.id === id) {
        programme.status = 'PUBLISHED';
      }
    });
  }

  // move to draft
  moveToDraft(id: number) {
    this.allProgrammes.map((programme: any) => {
      if (programme.id === id) {
        programme.status = 'DRAFT';
      }
    });
  }

  // update programmes
  updateProgram(id: number, data: any) {
    const changesMade = '';
    this.allProgrammes.map((programme: any) => {
      if (programme.id === id) {
      }
    });
    // make api call to update program
  }

  // delete program
  deleteProgramme(id: number) {
    this.allProgrammes.filter((programme: any) => programme.id !== id);

    // make api call to delete program
  }
}
