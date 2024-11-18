import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { LocalStorageService } from '../../../../core/services/localStorageService/local-storage.service';
import { environment } from '../../../../../environments/environment.development';
import { LoginCredentials, User, UserRole } from '../../models/auth.model';

describe('AuthService', () => {
  let service: AuthService;
  let localStorageService: LocalStorageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        LocalStorageService
      ]
    });

    service = TestBed.inject(AuthService);
    localStorageService = TestBed.inject(LocalStorageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get user role', () => {
    spyOn(localStorageService, 'setItem');
    service.setUserRole('ADMIN' as UserRole);
    
    expect(service.userRole).toBe('ADMIN' as UserRole);
    expect(localStorageService.setItem).toHaveBeenCalledWith('USER_ROLE', 'ADMIN');
  });

  it('should clear user role', () => {
    spyOn(localStorageService, 'removeItem');
    service.clearUserRole();
    
    expect(service.userRole).toBeNull();
    expect(localStorageService.removeItem).toHaveBeenCalledWith('USER_ROLE');
  });

  it('should set and clear access token', () => {
    spyOn(localStorageService, 'setItem');
    spyOn(localStorageService, 'removeItem');

    service.setAccessToken('test-token');
    expect(localStorageService.setItem).toHaveBeenCalledWith('TOKEN', 'test-token');

    service.clearAccessToken();
    expect(localStorageService.removeItem).toHaveBeenCalledWith('TOKEN');
  });

  it('should check if user is authenticated', () => {
    service.setUserRole('admin' as UserRole);
    expect(service.isAuthenticated()).toBe(true);

    service.clearUserRole();
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should login user', () => {
    const mockCredentials = { username: 'test', password: 'test123' };
    const mockResponse = { id: 1, username: 'test', role: 'admin' as UserRole };

    service.login(mockCredentials as unknown as LoginCredentials).subscribe(response => {
      expect(response).toEqual(mockResponse as unknown as User);
    });

    const req = httpMock.expectOne(`${environment.BASE_API}/v1/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCredentials);
    req.flush(mockResponse);
  });
});