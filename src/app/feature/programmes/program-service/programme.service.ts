import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProgrammeService {
  constructor(private http: HttpClient) {}

  programmes: any = [];

  createProgram(data: any) {
    return this.http.post(
      environment.COMPANY_PROGRAMMES_BASE_API +
        environment.CREATE_PROGRAM_ENDPOINT,
      data
    );
  }

  getPrograms() {
    this.http
      .get(
        environment.COMPANY_PROGRAMMES_BASE_API + environment.GET_ALL_PROGRAMMES
      )
      .subscribe((data) => console.log(data));
  }

  draftProgram() {}
}
