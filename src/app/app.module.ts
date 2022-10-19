import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { initializerProviders } from '@shared/services/system/initializer.providers';
import { LoginService } from '@core/auth';
import { FakeLoginService } from './fake-login.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    NgxPermissionsModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    { provide: LoginService, useClass: FakeLoginService }, // <= Remove it in the real APP
    initializerProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
