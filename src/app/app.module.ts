import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { initializerProviders } from '@shared/services/system/initializer.providers';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    NgxPermissionsModule.forRoot(),
    AngularSvgIconModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    // { provide: LoginService, useClass: FakeLoginService }, // <= Remove it in the real APP
    initializerProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
