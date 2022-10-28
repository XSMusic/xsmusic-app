import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  AlertComponent,
  BreadcrumbeComponent,
  FullImageComponent,
  HeaderComponent,
  ArtistsLastBlockComponent,
  ModalComponent,
  NavbarComponent,
  SearchBarComponent,
  ToastComponent,
  ArtistsViewListComponent,
  ButtonsBlockComponent,
} from '@components';
import {
  CountryFlagPipe,
  CountryNamePipe,
  TruncateTextPipe,
  TimeAgoPipe,
} from '@pipes';
import { OnImageErrorDirective } from './directives';
import { NgxPermissionsModule } from 'ngx-permissions';
import {
  AngularSvgIconPreloaderService,
  ArtistService,
  LocalStorageService,
  ScrapingService,
  StartupService,
  UserService,
} from '@services';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { httpInterceptorProviders } from '@core/interceptors';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxSpinnerModule } from 'ngx-spinner';

const components = [
  AlertComponent,
  ButtonsBlockComponent,
  ArtistsLastBlockComponent,
  ArtistsViewListComponent,
  BreadcrumbeComponent,
  FullImageComponent,
  HeaderComponent,
  ModalComponent,
  NavbarComponent,
  SearchBarComponent,
  ToastComponent,
];
const directives = [OnImageErrorDirective];
const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  InfiniteScrollModule,
  NgxPermissionsModule,
  RouterModule,
  AngularSvgIconModule,
  NgxSpinnerModule,
];
const pipes = [CountryFlagPipe, CountryNamePipe, TimeAgoPipe, TruncateTextPipe];
const services: any = [
  ArtistService,
  LocalStorageService,
  StartupService,
  UserService,
  AngularSvgIconPreloaderService,
  ScrapingService,
];

@NgModule({
  imports: [...modules],
  exports: [...modules, ...components, ...pipes, ...directives],
  declarations: [...components, ...pipes, ...directives],
  providers: [...services, httpInterceptorProviders],
})
export class SharedModule {}
