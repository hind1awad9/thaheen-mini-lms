import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { PROGRESS_STORAGE } from './core/storage/progress-storage.token';
import { LocalStorageProgressService } from './core/storage/local-storage-progress.service';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: PROGRESS_STORAGE,
      useExisting: LocalStorageProgressService,
    },
  ],
};
