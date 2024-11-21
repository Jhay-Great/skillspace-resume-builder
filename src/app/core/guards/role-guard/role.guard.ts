import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../../services/localStorageService/local-storage.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  const userRole = localStorageService.getItem('USER_ROLE');
  const requiredRole = route.data['role'];

  if (userRole !== requiredRole) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
