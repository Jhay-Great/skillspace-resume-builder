import { Injectable, signal, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment.development';
import {
  ICompanyRegistrationDetails,
  ITalentRegistrationDetails,
} from '@src/app/core/interfaces/user-registration.interface';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  private api: string = environment.BASE_API;
  private companyEndpoint: string = environment.COMPANY_ENDPOINT;
  private talentEndpoint: string = environment.TALENT_ENDPOINT;
  private otpEndpoint: string = environment.OTP_ENDPOINT;

  // signals
  otpResponse = signal<string | null> (null);
  user = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  companySignUp(data: ICompanyRegistrationDetails) {
    return this.submitForApproval(`${this.api}${this.companyEndpoint}`, data);
  }

  talentSignUp(data: ITalentRegistrationDetails) {
    return this.submitForApproval(`${this.api}${this.talentEndpoint}`, data);
  }

  private submitForApproval<T>(api: string, data: T) {
    return this.http.post(api, data);
  }

  verifyOTP(otp: string) {
    return this.submitForApproval(
      `${this.api}${this.otpEndpoint}`,
      otp
    )
  }
}
