import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ProfileManagementService } from './profile-management.service';
import { CompanyProfileResponseData } from '@src/app/core/interfaces/profile-management.interface';

describe('ProfileManagementService', () => {
  let service: ProfileManagementService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileManagementService],
    });
    service = TestBed.inject(ProfileManagementService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should retrieve company data from the correct API endpoint', () => {
    const mockResponse: CompanyProfileResponseData = {
      statusCode: 200,
      message: 'Data returned successfully',
      data: {
        companyName: 'jk ventures', 
        contact: '+233 23 232 2323',
        website: 'jkv.io',
        logo: 'logo',
        certificate: 'certificate.pdf',
        email: 'jkv@jkv.com'
      },
    };

    const expectedUrl = 'http://someurllink.com';

    service.getCompanyData().subscribe({
      next: (response) => {
        expect(response).toEqual(mockResponse);
      }
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should make a PUT request with correct API and data', () => {
    // Arrange
    const testApi = 'https://api.example.com/test';
    const testData = { 
      id: 1, 
      name: 'Test Item' 
    };
    const mockResponseData = { 
      ...testData, 
      updated: true 
    };

    // Act
    service['update'](testApi, testData).subscribe({
      next: (response) => {
        // Assert response matches expected structure
        expect(response).toEqual(mockResponseData);
      }
    });

    // Verify HTTP request
    const req = httpMock.expectOne(testApi);
    
    // Assert request details
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(testData);

    // Respond with mock data
    req.flush(mockResponseData);
  });

  it('should handle different data types', () => {
    // Arrange
    const testApi = 'https://api.example.com/different-type';
    const testData = { 
      userId: 'user123', 
      active: true 
    };

    // Act
    service['update'](testApi, testData).subscribe({
      next: (response) => {
        // Assert response is received
        expect(response).toBeTruthy();
      }
    });

    // Verify HTTP request
    const req = httpMock.expectOne(testApi);
    
    // Assert request details
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(testData);

    // Respond with simple success response
    req.flush({ success: true });
  });
});
