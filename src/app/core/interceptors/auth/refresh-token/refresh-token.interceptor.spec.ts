import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { refreshTokenInterceptor } from './refresh-token.interceptor';
import { AuthService } from '@src/app/feature/authentication/services/auth-service/auth.service';
import { LocalStorageService } from '@src/app/core/services/localStorageService/local-storage.service';
import { of } from 'rxjs';

describe('RefreshTokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let localStorageServiceMock: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    // Create mock services
    authServiceMock = jasmine.createSpyObj('AuthService', [
      'refreshAccessToken', 
      'setToken', 
      'logout'
    ]);
    
    localStorageServiceMock = jasmine.createSpyObj('LocalStorageService', [
      'getItem'
    ]);

    // Configure testing module
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { 
          provide: HTTP_INTERCEPTORS, 
          useFactory: () => refreshTokenInterceptor, 
          multi: true 
        },
        { 
          provide: AuthService, 
          useValue: authServiceMock 
        },
        { 
          provide: LocalStorageService, 
          useValue: localStorageServiceMock 
        }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the interceptor', () => {
    expect(refreshTokenInterceptor).toBeTruthy();
  });

  it('should allow successful requests to pass through', () => {
    httpClient.get('/api/test').subscribe();
    
    const req = httpMock.expectOne('/api/test');
    req.flush({});
  });

  it('should attempt to refresh token on 401 error', () => {
    // Setup mock refresh token scenario
    localStorageServiceMock.getItem.and.returnValue('mock-refresh-token');
    authServiceMock.refreshAccessToken.and.returnValue(
      of({ accessToken: 'new-token', refreshToken: 'new-refresh-token' })
    );

    httpClient.get('/api/secure').subscribe({
      error: (error) => {
        expect(error.status).toBe(401);
      }
    });

    const req = httpMock.expectOne('/api/secure');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(localStorageServiceMock.getItem).toHaveBeenCalledWith('REFRESH-TOKEN');
    expect(authServiceMock.refreshAccessToken).toHaveBeenCalled();
  });

  it('should logout when no refresh token is available', () => {
    // Setup scenario with no refresh token
    localStorageServiceMock.getItem.and.returnValue(null);

    httpClient.get('/api/secure').subscribe({
      error: (error) => {
        expect(error.status).toBe(401);
      }
    });

    const req = httpMock.expectOne('/api/secure');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(authServiceMock.logout).toHaveBeenCalled();
  });
});