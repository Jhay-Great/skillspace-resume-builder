import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';
import { refreshTokenInterceptor } from './core/interceptors/auth/refresh-token/refresh-token.interceptor';
import { ApplicantsApprovalEffect } from './feature/user-registration/state/approval.effects';
import { applicantsApprovalReducer } from './feature/user-registration/state/approval.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor, refreshTokenInterceptor])),
    provideStore(),
    provideEffects(ApplicantsApprovalEffect),
    provideState('applicants', applicantsApprovalReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    MessageService,
    ConfirmationService,
  ],
};
