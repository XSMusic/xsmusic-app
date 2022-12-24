import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {
  AlertComponent,
  ArtistsViewListComponent,
  BlockInfoProfileAddressComponent,
  BlockInfoProfileComponent,
  BlockInfoProfileImageComponent,
  BlockSharingReportComponent,
  BlockSocialComponent,
  BlockStatsComponent,
  TabsComponent,
  EventsViewListComponent,
  FilterBarComponent,
  FullImageComponent,
  GenericViewGalleryComponent,
  GenericViewGalleryItemsComponent,
  HeaderComponent,
  ImagesEditBlockComponent,
  ImagesUploadUrlComponent,
  ImagesViewListComponent,
  LastArtistsComponent,
  LastEventsComponent,
  LastMediaItemsComponent,
  LastMediaComponent,
  LastMediaItemComponent,
  LastMultiComponent,
  LastMultiItemsComponent,
  MapComponent,
  MediaViewListComponent,
  ModalComponent,
  NavbarComponent,
  NavbarMobileMenuComponent,
  NavbarNormalMenuComponent,
  OptionsItemsComponent,
  SearchBarComponent,
  SearchInputComponent,
  LastSitesComponent,
  SitesViewListComponent,
  SocialInputsComponent,
  ToastComponent,
  UsersViewListComponent,
  MediaOneBase,
  GenericOneBase,
  GenericAdminListBase,
  AdminArtistOneComponent,
  AdminSiteOneComponent,
  AdminEventsScrapingComponent,
  AdminMediaOneComponent,
  AdminMediaAddSearchComponent,
  AdminMediaAddSearchItemsComponent,
  GenericListBase,
  VideoYoutubeComponent,
  AdminEventsScrapingSiteComponent,
  GenericAdminOneBase,
  AdminEventOneComponent,
} from '@components';
import {
  CountryFlagPipe,
  CountryNamePipe,
  TruncateTextPipe,
  TimeAgoPipe,
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
  ApiService,
  ArtistService,
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

const components = [
  AlertComponent,
  ArtistsViewListComponent,
  BlockInfoProfileAddressComponent,
  BlockInfoProfileComponent,
  BlockInfoProfileImageComponent,
  BlockSharingReportComponent,
  BlockSocialComponent,
  BlockStatsComponent,
  TabsComponent,
  EventsViewListComponent,
  FilterBarComponent,
  FullImageComponent,
  GenericViewGalleryComponent,
  GenericViewGalleryItemsComponent,
  HeaderComponent,
  ImagesEditBlockComponent,
  ImagesUploadUrlComponent,
  ImagesViewListComponent,
  LastArtistsComponent,
  LastEventsComponent,
  LastMultiComponent,
  LastMultiItemsComponent,
  MapComponent,
  MediaViewListComponent,
  ModalComponent,
  NavbarComponent,
  NavbarMobileMenuComponent,
  NavbarNormalMenuComponent,
  OptionsItemsComponent,
  SearchBarComponent,
  SearchInputComponent,
  LastSitesComponent,
  SitesViewListComponent,
  SocialInputsComponent,
  ToastComponent,
  UsersViewListComponent,
  LastMediaItemsComponent,
  LastMediaComponent,
  LastMediaItemComponent,
  MediaOneBase,
  GenericOneBase,
  GenericAdminListBase,
  AdminArtistOneComponent,
  AdminSiteOneComponent,
  AdminEventsScrapingComponent,
  AdminMediaAddSearchItemsComponent,
  AdminMediaAddSearchComponent,
  AdminMediaOneComponent,
  AdminEventsScrapingSiteComponent,
  GenericListBase,
  VideoYoutubeComponent,
  GenericAdminOneBase,
  AdminEventOneComponent,
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
];
const pipes = [
  CountryFlagPipe,
  CountryNamePipe,
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
  LocalStorageService,
  MediaService,
  NavigationService,
  ScrapingService,
  SiteService,
  StartupService,
  UserService,
  VersionUpdateService,
  ValidationsFormService,
  ApiService,
];

@NgModule({
  imports: [...modules],
  exports: [...modules, ...components, ...pipes, ...directives],
  declarations: [...components, ...pipes, ...directives],
  providers: [...services, httpInterceptorProviders],
})
export class SharedModule {}
