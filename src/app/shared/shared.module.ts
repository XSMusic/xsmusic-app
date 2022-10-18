import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbeComponent, HeaderComponent, LastArtistsBlockComponent, ModalComponent, NavbarComponent, SearchBarComponent } from '@components';
import { CountryFlagPipe, CountryNamePipe, TruncateTextPipe } from '@pipes';

const components = [
  LastArtistsBlockComponent,
  BreadcrumbeComponent,
  HeaderComponent,
  ModalComponent,
  NavbarComponent,
  SearchBarComponent,
];
const modules = [CommonModule, RouterModule, FormsModule];
const pipes = [CountryFlagPipe, CountryNamePipe, TruncateTextPipe];
const services: any = [];

@NgModule({
  imports: [...modules],
  exports: [...modules, ...components, ...pipes],
  declarations: [...components, ...pipes],
  providers: [...services],
})
export class SharedModule {}
