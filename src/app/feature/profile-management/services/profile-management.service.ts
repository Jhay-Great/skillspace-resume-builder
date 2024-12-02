import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyProfileResponseData } from '@src/app/core/interfaces/profile-management.interface';
import { environment } from '@src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfileManagementService {
  private BASE_API:string = environment.BASE_API;
  private COMPANY_PROFILE_ENDPOINT:string = environment.COMPANY_PROFILE_ENDPOINT
  private GET_COMPANY_DATA:string = environment.GET_COMPANY_PROFILE_ENDPOINT;

  constructor(
    private http: HttpClient
  ) { }

  private get<T>(api:string) {
    return this.http.get<T>(api);
  }

  getCompanyData():Observable<CompanyProfileResponseData> {
    const api = `${this.BASE_API}/${this.GET_COMPANY_DATA}`;
    return this.get(api);
  }

  // private method to make the PUT request
  private update<D, T> (api:string, data:D):Observable<T> {
    return this.http.put<T>(api, data);
  }

  // UPDATE company profile
  updateCompanyProfile<T>(data:T) {
    return this.update(`${this.BASE_API}/${this.COMPANY_PROFILE_ENDPOINT}/`, data);
  }
}
