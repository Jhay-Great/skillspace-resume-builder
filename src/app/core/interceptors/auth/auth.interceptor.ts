import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../../services/localStorageService/local-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorage = inject(LocalStorageService);
  const token = localStorage.getItem('TOKEN');

  const excludeUrls = [
    'v1/users/company/register',
    'v1/users/talent/register',
    'v1/users/registration-otp/verify',
  ];

  const isExcluded = excludeUrls.some(url => req.url.includes(url));

  if (isExcluded) {
    return next(req);
  }

  const authRequest = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;
  return next(authRequest);
};
