import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ICompany } from '../../../core/interfaces/user-managment.interface';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  private api:string = environment.userRegistrationApi;
  private companyEndpoint:string  = '';
  private talentEndpoint:string  = '';

  constructor() { }

  companySignUp(data:ICompany) {
    console.log('called service with: ', data)
    return this.submitForApproval(`${this.api}${this.companyEndpoint}`, data);

  }
  
  talentSignUp (data:ICompany) {
    return this.submitForApproval(`${this.api}${this.talentEndpoint}`, data);
  }
  
  private submitForApproval(endpoint:string, data:ICompany) {}
}
