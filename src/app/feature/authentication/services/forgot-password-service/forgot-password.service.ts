import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '@src/environments/environment.development';
import {
  createUserCredentials,
  VerifyPasswordOtp,
} from '../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  constructor(private http: HttpClient) {}

  userEmail = signal<string | null>(null);

  setUserEmail(email: string) {
    this.userEmail.set(email);
  }

  makeOtpRequest(email: string) {
    return this.http.post<{ email: string }>(
      `${environment.BASE_API}v1/users/otp/request`,
      { email }
    );
  }

  verifyOtp(payload: VerifyPasswordOtp) {
    return this.http.post<VerifyPasswordOtp>(
      `${environment.BASE_API}v1/users/otp/verify`,
      payload
    );
  }

  createNewPassword(newUserCredentials: createUserCredentials) {
    return this.http.post<createUserCredentials>(
      `${environment.BASE_API}v1/users/password/save`,
      newUserCredentials
    );
  }
}
