import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../../services/localStorageService/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  const token = localStorageService.getItem('TOKEN');

  if (!token) {
    router.parseUrl('/login');
    return false;
  }
  return true;
};
