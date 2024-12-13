import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { LoginCredentials, refreshTokenResponse, User, UserRole } from '../../models/auth.model';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../../../core/services/localStorageService/local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userRole = signal<UserRole | null>(null);
  BASE_ADDRESS:string = environment.BASE_API;
  PORT:string = environment.AUTH_PORT;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this._userRole.set(this.localStorageService.getItem<UserRole>('USER_ROLE'));
  }

  get userRole(): UserRole | null {
    return this._userRole();
  }

  setUserRole(role: UserRole): void {
    this._userRole.set(role);
    this.localStorageService.setItem<UserRole>('USER_ROLE', role);
  }

  clearUserRole(): void {
    this._userRole.set(null);
    this.localStorageService.removeItem('USER_ROLE');
  }

  setToken(accessToken: string, refreshToken: string): void {
    this.localStorageService.setItem<string>('TOKEN', accessToken);
    this.localStorageService.setItem<string>('REFRESH-TOKEN', refreshToken);
  }

  clearToken(): void {
    this.localStorageService.removeItem('TOKEN');
    this.localStorageService.removeItem('REFRESH-TOKEN');
    this.localStorageService.removeItem('TOKEN_EXPIRATION');
  }

  isAuthenticated(): boolean {
    return this.userRole !== null;
  }

  login(credentials: LoginCredentials): Observable<User> {
    return this.http.post<User>(`${environment.BASE_API}/v1/auth/login`, credentials);
  }

  refreshAccessToken(refreshToken: string): Observable<refreshTokenResponse> {
    return this.http.post<refreshTokenResponse>(`${environment.BASE_API}/v1/auth/refresh-token`, { refreshToken });
  }

  logout() {
    // Remove access token from local storage
    // Remove user role from local storage
    this.clearToken();
    this.clearUserRole();
    this.localStorageService.removeItem('userId');
    this.router.navigate(['auth/login']);
  }
}
