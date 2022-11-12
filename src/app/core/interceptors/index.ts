import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CachingInterceptor } from '@core/interceptors/caching-interceptor';
import { TokenInterceptor } from './token-interceptor';

export * from './token-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
];
