import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { LoginCredentials, User, UserRole } from '../../models/auth.model';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../../../core/services/localStorageService/local-storage.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ExtendedConfirmation } from '@src/app/core/interfaces/confirmation.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userRole = signal<UserRole | null>(null);
  private tokenExpirationTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly tokenExpirationTime = 60 * 60 * 1000; // 1 hour
  
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {
    this._userRole.set(this.localStorageService.getItem<UserRole>('USER_ROLE'));
    this.initializeTokenExpiration();
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

    // calculate the expiration time of the token and store it in local storage
    const expirationTime = Date.now() + this.tokenExpirationTime;
    this.localStorageService.setItem('TOKEN_EXPIRATION', expirationTime.toString());
    
    this.startTokenExpirationTimer()
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
    return this.http.post<User>(
      `${environment.BASE_API}/v1/auth/login`,
      credentials
    );
  }

  refreshAccessToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(
      `${environment.BASE_API}/v1/auth/refresh-token`,
      { refreshToken }
    );
  }

  showStayLoggedInDialog() {
    this.confirmationService.confirm({
      header: 'Stay signed in',
      message: 'Do you want to stay signed in?',
      acceptSeverity: 'primary',
      rejectSeverity: 'secondary',
      acceptLabel: 'Stay signed in',
      rejectLabel: 'Cancel',
      accept: () => {
        this.refreshAccessToken(
          this.localStorageService.getItem<string>('REFRESH-TOKEN')!
        ).subscribe((response) => {
          this.setToken(response.accessToken, response.refreshToken);
          this.startTokenExpirationTimer();
        });
      },
      reject: () => {
        this.logout();
        this.router.navigate(['auth/login']);
      },
    } as ExtendedConfirmation);
  }

  // if user refreshes the page, we reinitialize the token expiration timer with the time remaining
  private initializeTokenExpiration(): void {
    const expirationTime = this.localStorageService.getItem<number>('TOKEN_EXPIRATION');
    if (expirationTime) {
      const timeRemaining = expirationTime - Date.now();
      if (timeRemaining > 0) {
        this.startTokenExpirationTimer(timeRemaining);
      } else {
        this.logout(); // Token is already expired, logout
      }
    }
  }

  // Handle token expiration and refresh logic
  startTokenExpirationTimer(timeRemaining: number = this.tokenExpirationTime) {
    const fiveMinutesBeforeExpiration = timeRemaining - 5 * 60 * 1000;

    this.tokenExpirationTimeout = setTimeout(() => {
      this.showStayLoggedInDialog();
    }, fiveMinutesBeforeExpiration); // show dialog 5 minutes before expiration
  }



  // Stop the expiration timer when the user logs out
  stopTokenExpirationTimer() {
    if (this.tokenExpirationTimeout) {
      clearTimeout(this.tokenExpirationTimeout);
    }
  }

  logout() {
    // Remove access token from local storage
    // Remove user role from local storage
    this.clearToken();
    this.stopTokenExpirationTimer();
    this.clearUserRole();
    this.localStorageService.removeItem('userId');
    this.router.navigate(['auth/login']);
  }
}
