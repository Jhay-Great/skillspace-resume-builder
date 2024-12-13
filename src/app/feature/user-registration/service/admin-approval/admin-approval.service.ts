import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ApplicantResponse, ApplicantsData } from '@src/app/core/interfaces/user-registration.interface';
import { LocalStorageService } from '@src/app/core/services/localStorageService/local-storage.service';
import { environment } from '@src/environments/environment.development';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminApprovalService {
  api: string = environment.BASE_API;
  companies: string = environment.ALL_COMPANIES;
  approval: string = environment.APPROVAL_ENDPOINT;

  allApplicants = signal<ApplicantsData[] | null>(null);
  selectedUser = signal<ApplicantsData | null>(null);
  successMessage = signal<string>('');

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getCompanies(): Observable<ApplicantResponse> {
    return this.http.get<ApplicantResponse>(`${this.api}/${this.companies}`);
  }

  post<D, T>(api: string, data: D) {
    return this.http.post<T>(api, data);
  }

  acceptApplicant(id: number) {
    return this.post(`${this.api}/${this.approval}/${id}/approve`, id);
  }

  rejectApplicant(id: number) {
    return this.post(`${this.api}/${this.approval}/${id}/reject`, id);
  }

  selectedApplicant(id: number) {
    if (!this.allApplicants()) {
      const data = this.localStorageService.getItem('allApplicants');
      this.allApplicants.set(data as ApplicantsData[]);
    }
    const applicant = this.allApplicants()?.find((user) => user.id === id);
    if (!applicant) return;
    this.selectedUser.set(applicant);
  }
}
