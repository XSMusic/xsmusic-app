import { APP_INITIALIZER } from '@angular/core';
import { StartupService } from './startup.service';

export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

export const initializerProviders = [
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
];
