import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment.development';
import {
  CompanyRegistrationDetails,
  CompanyRegistrationResponse,
  OtpData,
  TalentRegistrationDetails,
  TalentRegistrationResponse,
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

  // signals
  otpResponse = signal<string | null>(null);
  user = signal<string | null>(null);
  userEmail = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  private submitForApproval<D, T>(api: string, data: D) {
    return this.http.post<T>(api, data);
  }

  companySignUp(data: FormData): Observable<CompanyRegistrationResponse> {
    return this.submitForApproval<FormData, CompanyRegistrationResponse>(
      `${this.api}/${this.companyEndpoint}`,
      data
    );
  }

  talentSignUp(
    data: TalentRegistrationDetails
  ): Observable<TalentRegistrationResponse> {
    return this.submitForApproval<
      TalentRegistrationDetails,
      TalentRegistrationResponse
    >(`${this.api}/${this.talentEndpoint}`, data);
  }

  verifyOTP(otp: OtpData) {
    return this.submitForApproval<OtpData, null>(
      `${this.api}/${this.otpEndpoint}`,
      otp
    )
  }
}
