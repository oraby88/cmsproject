import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withViewTransitions, withPreloading, } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules), withViewTransitions()), // preloding the lazy loading components
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    provideClientHydration(),
    provideAnimationsAsync(),
  ],
};
