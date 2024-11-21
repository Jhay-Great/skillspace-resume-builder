import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicantResponse } from '@src/app/core/interfaces/user-registration.interface';
import { environment } from '@src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminApprovalService {
  api:string = environment.BASE_API;
  companies:string = environment.ALL_COMPANIES;

  constructor(
    private http: HttpClient,
  ) { }

  getCompanies():Observable<ApplicantResponse> {
    return this.http.get<ApplicantResponse>(`${this.api}/${this.companies}`);
  }
}
