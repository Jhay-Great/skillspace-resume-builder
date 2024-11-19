import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../../../feature/authentication/services/auth-service/auth.service';

describe('authGuard', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        Router
      ]
    });

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should allow access when the user is authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = authGuard(route, state);
    expect(result).toBe(true);
  });

  it('should deny access when the user is not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    spyOn(router, 'navigate');

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = authGuard(route, state);
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});