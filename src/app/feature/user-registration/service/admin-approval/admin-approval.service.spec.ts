import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AdminApprovalService } from './admin-approval.service';
import { ApplicantResponse } from '@src/app/core/interfaces/user-registration.interface';

describe('AdminApprovalService', () => {
  let service: AdminApprovalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminApprovalService]
    });
    service = TestBed.inject(AdminApprovalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch companies', () => {
    const mockResponse: ApplicantResponse = {
      statusCode: 1,
      message: 'success',
      data: [
      {id: 1,
      role: 'TALENT',
      isOtpVerified: false,
      approvalStatus: 'pending',
      logo: '',
      certificate: '',
      name: 'K&B',
      email: 'kb@gmail.com',
      website: 'kb.io',
      contact: '+233 030 233 232',
      createdAt: '11/22/24',}
      ]
    };

    service.getCompanies().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.api}/${service.companies}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
