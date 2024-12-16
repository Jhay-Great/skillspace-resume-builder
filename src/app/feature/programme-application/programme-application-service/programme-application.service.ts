import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment.development';
import { Badge, BadgeResponse, CompanyProgramme } from '@src/app/core/interfaces/interfaces';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgrammeApplicationService {
  constructor(private http: HttpClient) {}

  currentlyViewingProgramme!: CompanyProgramme;
  badges!:Badge[]

  // get all available programmes
  getAllAvailableProgrammes() {
    return this.http.get<CompanyProgramme[]>(environment.BASE_API + environment.GET_AVAILABLE_PROGRAMMES);
  }

  // apply for a programme
  applyForProgramme(programmeId: number) {
    return this.http.post(`${environment.BASE_API}${environment.APPLY_FOR_PROGRAMME}/${programmeId}`, {});
  }

  // get badge names with id
  getBadgeNames() {
     this.http.get<BadgeResponse>(environment.BASE_API + environment.GET_BADGE_NAME).subscribe({
       next: (data) => {
         this.badges = data.data;
         console.log(this.badges);
         
       },
       error: (error) => {
         console.log(error);
       },
     });
  }
}
