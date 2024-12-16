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

  currentlyViewingProgramme!: CompanyProgramme;

  // get all available programmes
  getAllAvailableProgrammes() {
    return this.http.get<CompanyProgramme[]>(environment.BASE_API + environment.GET_AVAILABLE_PROGRAMMES);
  }

  // apply for a programme
  applyForProgramme(programmeId: number) {
    return this.http.post(`${environment.BASE_API}${environment.APPLY_FOR_PROGRAMME}/${programmeId}`, {});
  }
}
