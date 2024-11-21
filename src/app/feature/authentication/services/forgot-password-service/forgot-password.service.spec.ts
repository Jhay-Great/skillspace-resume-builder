import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ForgotPasswordService } from './forgot-password.service';
import { environment } from '@src/environments/environment.development';
import { VerifyPasswordOtp } from '../../models/auth.model';

describe('ForgotPasswordService', () => {
  let service: ForgotPasswordService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ForgotPasswordService]
    });

    service = TestBed.inject(ForgotPasswordService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('userEmail signal', () => {
    it('should set and get user email', () => {
      const testEmail = 'test@example.com';
      service.setUserEmail(testEmail);
      expect(service.userEmail()).toBe(testEmail);
    });
  });

  describe('makeOtpRequest', () => {
    it('should send OTP request to correct endpoint', () => {
      const testEmail = 'test@example.com';
      
      service.makeOtpRequest(testEmail).subscribe();

      const req = httpMock.expectOne(`${environment.BASE_API}v1/users/otp/request`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email: testEmail });
      req.flush({ email: testEmail });
    });
  });

  describe('verifyOtp', () => {
    it('should send OTP verification request to correct endpoint', () => {
      const payload: VerifyPasswordOtp = {
        email: 'test@example.com',
        token: '123456'
      };
      
      service.verifyOtp(payload).subscribe();

      const req = httpMock.expectOne(`${environment.BASE_API}v1/users/otp/verify`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(payload);
      req.flush(payload);
    });
  });

  describe('createNewPassword', () => {
    it('should send new password creation request to correct endpoint', () => {
      const newCredentials = {
        email: 'test@example.com',
        password: 'newpassword123'
      };
      
      service.createNewPassword(newCredentials).subscribe();

      const req = httpMock.expectOne(`${environment.BASE_API}v1/users/password/save`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newCredentials);
      req.flush(newCredentials);
    });
  });
});