import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';
import { refreshTokenInterceptor } from './core/interceptors/auth/refresh-token/refresh-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor, refreshTokenInterceptor])),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    MessageService,
    ConfirmationService,
  ],
};
