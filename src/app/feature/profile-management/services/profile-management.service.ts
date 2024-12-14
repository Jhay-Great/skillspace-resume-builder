import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError, take, map } from 'rxjs';
import { CompanyProfileResponseData, ProfileData, TalentProfile, TalentProfileResponseData } from '@src/app/core/interfaces/profile-management.interface';
import { environment } from '@src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProfileManagementService {
  private BASE_API: string = environment.BASE_API;
  private COMPANY_PROFILE_ENDPOINT: string = environment.COMPANY_PROFILE_ENDPOINT;
  private TALENT_PROFILE_ENDPOINT: string = environment.TALENT_PROFILE_ENDPOINT;
  private GET_COMPANY_DATA: string = environment.GET_COMPANY_PROFILE_ENDPOINT;
  private GET_TALENT_DATA: string = environment.GET_TALENT_PROFILE_ENDPOINT;

  constructor(private http: HttpClient) {}

  private get<T>(api: string) {
    return this.http.get<T>(api);
  }

  getCompanyData(): Observable<CompanyProfileResponseData> {
    const api = `${this.BASE_API}/${this.GET_COMPANY_DATA}`;
    return this.get(api);
  }
  getTalentData(): Observable<TalentProfile> {
    const api = `${this.BASE_API}/${this.GET_TALENT_DATA}`;
    return this.get<TalentProfileResponseData>(api).pipe(
      take(1),
      map(response => {
        return response.data;
      })
    )
  }

  // private method to make the PUT request
  private update<D, T>(api: string, data: D): Observable<T> {
    return this.http.patch<T>(api, data);
  }

  // UPDATE company profile
  updateCompanyProfile<T>(data: T, id: number) {
    return this.update(`${this.BASE_API}/${this.COMPANY_PROFILE_ENDPOINT}/${id}/update`, data).pipe(
      retry(3),
      catchError((error) => {
        const { message } = error.error;
        return throwError(() => message);
      })
    );
  }

  // UPDATE talent profile
  updateTalentProfile<T>(data: T, id: number) {
    return this.update(`${this.BASE_API}/${this.TALENT_PROFILE_ENDPOINT}/${id}/update`, data).pipe(
      retry(3),
      catchError((error) => {
        const { message } = error.error;
        return throwError(() => message);
      })
    );
  }
}
