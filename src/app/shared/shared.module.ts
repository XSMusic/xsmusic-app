import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbeComponent, HeaderComponent, LastArtistsBlockComponent, NavbarComponent } from '@components';
import { CountryFlagPipe } from '@pipes';

const components = [
  LastArtistsBlockComponent,
  BreadcrumbeComponent,
  HeaderComponent,
  NavbarComponent,
];
const modules = [CommonModule, RouterModule, FormsModule];
const pipes = [CountryFlagPipe];
const services: any = [];

@NgModule({
  imports: [...modules],
  exports: [...modules, ...components, ...pipes],
  declarations: [...components, ...pipes],
  providers: [...services],
})
export class SharedModule {}
