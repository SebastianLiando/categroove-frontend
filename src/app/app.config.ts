import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {providePrimeNG} from 'primeng/config';
import {categroovePreset} from './styles/categroove-preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG(
      {
        ripple: true,
        theme: {
          preset: categroovePreset,
          options: {
            cssLayer: {
              name: 'primeng',
              order: 'theme, base, primeng'
            }
          }
        }
      }
    )
  ]
};
