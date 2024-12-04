import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '@src/app/core/services/localStorageService/local-storage.service';
import { AuthService } from '@src/app/feature/authentication/services/auth-service/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const notRefreshTokenRequest = !req.url.includes('/auth/refresh-token');
      const accessTokenExpired = error.status === 401;
      
      if (accessTokenExpired && notRefreshTokenRequest) {
        return refreshToken(authService, req, next);
      }
      return throwError(() => error);
    })
  );
  
};


function refreshToken(
  authService: AuthService,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const localStorageService = inject(LocalStorageService);
  const refreshToken = localStorageService.getItem<string>('REFRESH-TOKEN');

  if (refreshToken) {
    return authService.refreshAccessToken(refreshToken).pipe(
      switchMap((response) => {
        // Update the tokens in the local storage
        authService.setToken(response.accessToken, response.refreshToken);

        // Retry the original request with the new token
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${response.accessToken}`,
          },
        });
        return next(clonedRequest);
      }),
      catchError((err) => {
        // If refreshing the token fails, log the user out
        authService.logout();
        return throwError(() => err);
      })
    );
  } else {
    // If no refresh token is available, log the user out
    authService.logout();
    return throwError(() => new Error('Refresh token not available.'));
  }
}