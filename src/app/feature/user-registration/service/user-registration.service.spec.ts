import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserRegistrationService } from './user-registration.service';
import {
  ICompanyRegistrationDetails,
  ITalentRegistrationDetails,
} from '../../../core/interfaces/user-managment.interface';

describe('UserRegistrationService', () => {
  let service: UserRegistrationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserRegistrationService],
    });
    service = TestBed.inject(UserRegistrationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call companySignUp with the correct data', () => {
    const api = 'https://www.thisisalink.com';
    const endpoint = '/compnay';
    const mockCompanyData: ICompanyRegistrationDetails = {
      name: 'AmaliTech',
      email: 'amalitechtraining@amalitech.org',
      password: 'som#th1ngNice',
      confirmPassword: 'som#th1ngNice',
      website: 'amalitech.org',
      certificate: new FormData(),
      logo: new FormData(),
      contact: '+2338493984',
    };

    service.companySignUp(mockCompanyData).subscribe();

    const req = httpMock.expectOne(`${api}${endpoint}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCompanyData);
    req.flush({});
  });

  it('should call talentSignUp with the correct data', () => {
    const api = 'https://www.thisisalink.com';
    const endpoint = '/compnay';
    const mockTalentData: ITalentRegistrationDetails = {
      fullName: 'AmaliTech',
      email: 'amalitechtraining@amalitech.org',
      password: 'som#th1ngNice',
      confirmPassword: 'som#th1ngNice',
      contact: '+2338493984',
    };

    service.talentSignUp(mockTalentData).subscribe();

    const req = httpMock.expectOne(`${api}${endpoint}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockTalentData);
    req.flush({});
  });
});
