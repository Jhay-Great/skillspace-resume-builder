import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../../services/localStorageService/local-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorage = inject(LocalStorageService);
  const token = localStorage.getItem('TOKEN');
  
  const authRequest = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    }
  }) : req;
  return next(authRequest);
};
