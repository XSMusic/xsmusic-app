import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  AlertComponent,
  BreadcrumbeComponent,
  HeaderComponent,
  LastArtistsBlockComponent,
  ModalComponent,
  NavbarComponent,
  SearchBarComponent,
} from '@components';
import { CountryFlagPipe, CountryNamePipe, TruncateTextPipe } from '@pipes';
import { OnImageErrorDirective } from './directives';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ArtistService, LocalStorageService, StartupService, UserService } from '@services';

const components = [
  AlertComponent,
  LastArtistsBlockComponent,
  BreadcrumbeComponent,
  HeaderComponent,
  ModalComponent,
  NavbarComponent,
  SearchBarComponent,
];
const directives = [OnImageErrorDirective];
const modules = [CommonModule, NgxPermissionsModule, RouterModule, FormsModule];
const pipes = [CountryFlagPipe, CountryNamePipe, TruncateTextPipe];
const services: any = [ArtistService, UserService, LocalStorageService, StartupService];

@NgModule({
  imports: [...modules],
  exports: [...modules, ...components, ...pipes, ...directives],
  declarations: [...components, ...pipes, ...directives],
  providers: [...services],
})
export class SharedModule {}
