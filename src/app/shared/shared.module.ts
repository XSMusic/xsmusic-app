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
  ArtistsButtonsComponent,
} from '@components';
import {
  CountryFlagPipe,
  CountryNamePipe,
  IconPipe,
  TruncateTextPipe,
} from '@pipes';
import { OnImageErrorDirective } from './directives';
import { NgxPermissionsModule } from 'ngx-permissions';
import {
  AngularSvgIconPreloaderService,
  ArtistService,
  LocalStorageService,
  StartupService,
  UserService,
} from '@services';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { httpInterceptorProviders } from '@core/interceptors';
import { AngularSvgIconModule } from 'angular-svg-icon';

const components = [
  AlertComponent,
  ArtistsButtonsComponent,
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
];
const pipes = [CountryFlagPipe, CountryNamePipe, TruncateTextPipe, IconPipe];
const services: any = [
  ArtistService,
  LocalStorageService,
  StartupService,
  UserService,
  AngularSvgIconPreloaderService,
];

@NgModule({
  imports: [...modules],
  exports: [...modules, ...components, ...pipes, ...directives],
  declarations: [...components, ...pipes, ...directives],
  providers: [...services, httpInterceptorProviders],
})
export class SharedModule {}
