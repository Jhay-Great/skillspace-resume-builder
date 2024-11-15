import { Injectable, } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ICompany, ITalent } from '../../../core/interfaces/user-managment.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  private api:string = environment.BASE_API;
  private companyEndpoint:string  = environment.COMPANY_ENDPOINT;
  private talentEndpoint:string  = environment.TALENT_ENDPOINT;

  constructor(
    private http:HttpClient,
  ) { }

  companySignUp(data:ICompany) {
    return this.submitForApproval(`${this.api}${this.companyEndpoint}`, data);

  }
  
  talentSignUp (data:ITalent) {
    return this.submitForApproval(`${this.api}${this.talentEndpoint}`, data);
  }
  
  private submitForApproval<T>(api:string, data:T) {
    return this.http.post(api, data);
  }
}

