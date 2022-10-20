import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  AlertComponent,
  BreadcrumbeComponent,
  HeaderComponent,
  LastArtistsBlockComponent,
  ModalAlertComponent,
  NavbarComponent,
  SearchBarComponent,
  ToastComponent,
} from '@components';
import { CountryFlagPipe, CountryNamePipe, TruncateTextPipe } from '@pipes';
import { OnImageErrorDirective } from './directives';
import { NgxPermissionsModule } from 'ngx-permissions';
import {
  ArtistService,
  LocalStorageService,
  StartupService,
  ToastService,
  UserService,
} from '@services';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { httpInterceptorProviders } from '@core/interceptors';

const components = [
  AlertComponent,
  BreadcrumbeComponent,
  HeaderComponent,
  LastArtistsBlockComponent,
  ModalAlertComponent,
  NavbarComponent,
  SearchBarComponent,
  ToastComponent
];
const directives = [OnImageErrorDirective];
const modules = [
  CommonModule,
  FormsModule,
  InfiniteScrollModule,
  NgxPermissionsModule,
  RouterModule,
];
const pipes = [CountryFlagPipe, CountryNamePipe, TruncateTextPipe];
const services: any = [
  ArtistService,
  LocalStorageService,
  StartupService,
  UserService,
];

@NgModule({
  imports: [...modules],
  exports: [...modules, ...components, ...pipes, ...directives],
  declarations: [...components, ...pipes, ...directives],
  providers: [...services, httpInterceptorProviders],
})
export class SharedModule {}
