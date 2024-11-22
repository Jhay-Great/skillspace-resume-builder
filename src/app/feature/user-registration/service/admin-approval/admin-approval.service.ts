import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ApplicantResponse, ApplicantsData } from '@src/app/core/interfaces/user-registration.interface';
import { environment } from '@src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminApprovalService {
  api:string = environment.BASE_API;
  companies:string = environment.ALL_COMPANIES;
  approval:string = environment.APPROVAL_ENDPOINT;
  // rejected:string = environment.REJECTED;

  selectedUser = signal<ApplicantsData | null>(null);

  constructor(
    private http: HttpClient,
  ) { }

  getCompanies():Observable<ApplicantResponse> {
    return this.http.get<ApplicantResponse>(`${this.api}/${this.companies}`);
  }

  post<D, T>(api:string, data: D) {
    return this.http.post<T>(api, data);
  }

  acceptApplicant(id:number) {
    return this.post(`${this.api}/${this.approval}/${id}/approve`, id);
  }

  rejectApplicant(id:number) {
    return this.post(`${this.api}/${this.approval}/${id}/reject`, id);
  }
}
