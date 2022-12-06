import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {
  AlertComponent,
  ArtistsLastBlockComponent,
  ArtistsViewListComponent,
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
  BlockStatsComponent,
  BlockSharingReportComponent,
  SocialInputsComponent,
  BlockSocialComponent,
  BlockInfoProfileAddressComponent,
  BlockInfoProfileImageComponent,
  CalendarComponent,
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
  DateToDayOrMonthPipe,
  DateFormatAgoPipe,
  FirstLetterPipe,
} from '@pipes';
import { OnImageErrorDirective } from './directives';
import { NgxPermissionsModule } from 'ngx-permissions';
import {
  AngularSvgIconPreloaderService,
  ArtistService,
  LeafletService,
  LocalStorageService,
  MediaService,
  NavigationService,
  ScrapingService,
  SiteService,
  StartupService,
  UserService,
  ValidationsFormService,
  VersionUpdateService,
} from '@services';
import { httpInterceptorProviders } from '@core/interceptors';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SwiperModule } from 'swiper/angular';
import { InfiniteScrollModule } from './services/system/ngx-infinite-scroll/ngx-infinite-scroll.module';
import { NgxSpinnerModule } from './services/system/ngx-spinner/ngx-spinner.module';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

const components = [
  AlertComponent,
  ArtistsLastBlockComponent,
  ArtistsViewListComponent,
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
  BlockStatsComponent,
  BlockSharingReportComponent,
  SocialInputsComponent,
  BlockSocialComponent,
  BlockInfoProfileAddressComponent,
  BlockInfoProfileImageComponent,
  CalendarComponent,
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
  YouTubePlayerModule,
  CalendarModule,
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
  DateToDayOrMonthPipe,
  DateFormatAgoPipe,
  FirstLetterPipe,
];
const services = [
  AngularSvgIconPreloaderService,
  ArtistService,
  LeafletService,
  LocalStorageService,
  MediaService,
  NavigationService,
  ScrapingService,
  SiteService,
  StartupService,
  UserService,
  VersionUpdateService,
  ValidationsFormService,
];

@NgModule({
  imports: [...modules],
  exports: [...modules, ...components, ...pipes, ...directives],
  declarations: [...components, ...pipes, ...directives],
  providers: [...services, httpInterceptorProviders],
})
export class SharedModule {}
