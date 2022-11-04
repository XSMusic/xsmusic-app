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
  MediaViewListComponent,
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
  MediaService,
  ScrapingService,
  StartupService,
  UserService,
  YoutubeService,
} from '@services';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { httpInterceptorProviders } from '@core/interceptors';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SwiperModule } from 'swiper/angular';

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
  MediaViewListComponent,
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
  SwiperModule,
];
const pipes = [CountryFlagPipe, CountryNamePipe, TimeAgoPipe, TruncateTextPipe];
const services: any = [
  ArtistService,
  LocalStorageService,
  StartupService,
  UserService,
  AngularSvgIconPreloaderService,
  ScrapingService,
  MediaService,
  YoutubeService,
];

@NgModule({
  imports: [...modules],
  exports: [...modules, ...components, ...pipes, ...directives],
  declarations: [...components, ...pipes, ...directives],
  providers: [...services, httpInterceptorProviders],
})
export class SharedModule {}
