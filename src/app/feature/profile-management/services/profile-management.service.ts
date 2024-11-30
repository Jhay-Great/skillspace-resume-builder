import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileManagementService {
  private BASE_API:string = environment.BASE_API;
  private COMPANY_PROFILE_ENDPOINT:string = environment.COMPANY_PROFILE_ENDPOINT

  constructor(
    private http: HttpClient
  ) { }

  // private method to make the PUT request
  private update<D, T> (api:string, data:D):Observable<T> {
    return this.http.put<T>(api, data);
  }

  // UPDATE company profile
  updateCompanyProfile(data:any) {
    return this.update(`${this.BASE_API}/${this.COMPANY_PROFILE_ENDPOINT}/`, data);
  }
}
