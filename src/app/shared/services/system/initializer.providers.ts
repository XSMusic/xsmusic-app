import { APP_INITIALIZER } from '@angular/core';
import { AngularSvgIconPreloaderService } from './angular-svg-icon-preloader/angular-svg-icon-preloader.service';
import { StartupService } from './startup.service';

export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

export function AngularSvgIconPreloaderServiceFactory(
  svgSvc: AngularSvgIconPreloaderService
) {
  return () => svgSvc.load();
}

export const initializerProviders = [
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
  {
    provide: APP_INITIALIZER,
    useFactory: AngularSvgIconPreloaderServiceFactory,
    deps: [AngularSvgIconPreloaderService],
    multi: true,
  },
];
