import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment.development';
import { CompanyProgramme } from '@src/app/core/interfaces/interfaces';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgrammeApplicationService {
  constructor(private http: HttpClient) {}

  // get all available programmes
  getAllAvailableProgrammes() {
    return this.http.get<CompanyProgramme[]>(environment.BASE_API + environment.GET_AVAILABLE_PROGRAMMES);
  }
  // get all badges (assessment)
  getAllBadges() {
    return this.http.get<CompanyProgramme[]>(environment.BASE_API + environment.GET_ALL_QUIZZES);
  }
}
