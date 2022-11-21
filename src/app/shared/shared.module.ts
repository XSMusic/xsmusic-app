import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {
  AlertComponent,
  ArtistsLastBlockComponent,
  ArtistsViewListComponent,
  BreadcrumbeComponent,
  ButtonsBlockComponent,
  FullImageComponent,
  GenericViewGalleryComponent,
  GenericViewGalleryItemsComponent,
  HeaderComponent,
  ImagesEditBlockComponent,
  ImagesUploadUrlComponent,
  ImagesViewListComponent,
  MapComponent,
  MediaViewListComponent,
  ModalComponent,
  NavbarComponent,
  NavbarMobileMenuComponent,
  NavbarNormalMenuComponent,
  OptionsItemsComponent,
  SearchBarComponent,
  SiteLastMediaComponent,
  SiteLastMediaItemsComponent,
  SitesLastBlockComponent,
  SiteViewListComponent,
  ToastComponent,
  UsersViewListComponent,
  FilterBarComponent,
  LastMultiItemsComponent,
  LastMultiComponent,
  BlockInfoProfileComponent,
  EventsViewListComponent,
  SearchInputComponent,
} from '@components';
import {
  CountryFlagPipe,
  CountryNamePipe,
  TruncateTextPipe,
  TimeAgoPipe,
  FillArrayPipe,
  ImagePipe,
  RandomImagePipe,
  TypePipe,
  FilterArrayPipe,
  ImageArrayPipe,
  TitleMediaPipe,
  FixStatePipe,
} from '@pipes';
import { OnImageErrorDirective } from './directives';
import { NgxPermissionsModule } from 'ngx-permissions';
import {
  AngularSvgIconPreloaderService,
  ArtistService,
  LocalStorageService,
  MediaService,
  NavigationService,
  ScrapingService,
  SiteService,
  StartupService,
  UserService,
} from '@services';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { httpInterceptorProviders } from '@core/interceptors';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SwiperModule } from 'swiper/angular';

const components = [
  AlertComponent,
  ArtistsLastBlockComponent,
  ArtistsViewListComponent,
  BreadcrumbeComponent,
  ButtonsBlockComponent,
  FullImageComponent,
  GenericViewGalleryComponent,
  GenericViewGalleryItemsComponent,
  HeaderComponent,
  ImagesEditBlockComponent,
  ImagesViewListComponent,
  MapComponent,
  MediaViewListComponent,
  ModalComponent,
  NavbarComponent,
  NavbarMobileMenuComponent,
  NavbarNormalMenuComponent,
  OptionsItemsComponent,
  SearchBarComponent,
  FilterBarComponent,
  SiteLastMediaComponent,
  SiteLastMediaItemsComponent,
  SitesLastBlockComponent,
  SiteViewListComponent,
  ToastComponent,
  UsersViewListComponent,
  ImagesUploadUrlComponent,
  LastMultiItemsComponent,
  LastMultiComponent,
  BlockInfoProfileComponent,
  EventsViewListComponent,
  SearchInputComponent,
];
const directives = [OnImageErrorDirective];
const modules = [
  AngularSvgIconModule,
  AngularEditorModule,
  CommonModule,
  FormsModule,
  InfiniteScrollModule,
  NgxPermissionsModule,
  NgxSpinnerModule,
  ReactiveFormsModule,
  RouterModule,
  SwiperModule,
];
const pipes = [
  CountryFlagPipe,
  CountryNamePipe,
  FillArrayPipe,
  ImagePipe,
  RandomImagePipe,
  TimeAgoPipe,
  TruncateTextPipe,
  TypePipe,
  FilterArrayPipe,
  ImageArrayPipe,
  TitleMediaPipe,
  FixStatePipe,
];
const services: any = [
  AngularSvgIconPreloaderService,
  ArtistService,
  LocalStorageService,
  MediaService,
  NavigationService,
  ScrapingService,
  SiteService,
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
