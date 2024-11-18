import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from '../../services/localStorageService/local-storage.service';
import { roleGuard } from './role.guard';

describe('roleGuard', () => {
  let localStorageService: LocalStorageService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService, Router],
    });

    localStorageService = TestBed.inject(LocalStorageService);
    router = TestBed.inject(Router);
  });

  it('should allow access when the user role matches the required role', () => {
    spyOn(localStorageService, 'getItem').and.returnValue('admin');

    const route = {
      data: { role: 'admin' },
    } as unknown as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = roleGuard(route, state);
    expect(result).toBe(true);
  });

  it('should deny access when the user role does not match the required role', () => {
    spyOn(localStorageService, 'getItem').and.returnValue('user');
    spyOn(router, 'parseUrl');

    const route = {
      data: { role: 'admin' },
    } as unknown as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = roleGuard(route, state);
    expect(result).toBe(false);
    expect(router.parseUrl).toHaveBeenCalledWith('/login');
  });
});
