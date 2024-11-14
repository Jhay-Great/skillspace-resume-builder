import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ICompany } from '../../../core/interfaces/user-managment.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  private api:string = environment.userRegistrationApi;
  private companyEndpoint:string  = '';
  private talentEndpoint:string  = '';

  constructor(
    private http:HttpClient,
  ) { }

  companySignUp(data:ICompany) {
    console.log('called service with: ', data)
    return this.submitForApproval(`${this.api}${this.companyEndpoint}`, data);

  }
  
  talentSignUp (data:ICompany) {
    return this.submitForApproval(`${this.api}${this.talentEndpoint}`, data);
  }
  
  private submitForApproval(api:string, data:ICompany) {
    return this.http.post(api, data);
  }
}
