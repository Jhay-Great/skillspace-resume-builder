import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment.development';
import {
  ICompanyRegistrationDetails,
  ICompanyRegistrationResponse,
  IOtpData,
  ITalentRegistrationDetails,
  ITalentRegistrationResponse,
} from '@src/app/core/interfaces/user-registration.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  private api: string = environment.BASE_API;
  private companyEndpoint: string = environment.COMPANY_ENDPOINT;
  private talentEndpoint: string = environment.TALENT_ENDPOINT;
  private otpEndpoint: string = environment.OTP_ENDPOINT;
  private otpBase = environment.OTP_BASE_API;

  // signals
  otpResponse = signal<string | null>(null);
  user = signal<string | null>(null);
  userEmail = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  private submitForApproval<D, T>(api: string, data: D) {
    console.log('api: ', api);
    console.log('data: ', data);
    return this.http.post<T>(api, data);
  }

  companySignUp(data: FormData): Observable<ICompanyRegistrationResponse> {
    return this.submitForApproval<FormData, ICompanyRegistrationResponse>(
      `${this.api}/${this.companyEndpoint}`,
      data
    );
  }

  talentSignUp(
    data: ITalentRegistrationDetails
  ): Observable<ITalentRegistrationResponse> {
    return this.submitForApproval<
      ITalentRegistrationDetails,
      ITalentRegistrationResponse
    >(`${this.api}/${this.talentEndpoint}`, data);
  }

  verifyOTP(otp: IOtpData) {
    return this.submitForApproval<IOtpData, null>(
      `${this.otpBase}/${this.otpEndpoint}`,
      otp
    ).pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }
}
