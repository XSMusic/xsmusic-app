import { NgModule } from '@angular/core';
import { HomePage } from './pages/home.page';
import { RouterModule } from '@angular/router';
import { TopCountriesComponent } from './components/top-countries/top-countries.component';
import { SharedModule } from '@shared/shared.module';
import { LastMediaComponent } from './components/last-media/last-media.component';
import { LastMediaItemsComponent } from './components/last-media-items/last-media-items.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        data: { breadcrumb: '', title: 'Inicio' },
      },
    ]),
  ],
  exports: [],
  declarations: [
    LastMediaComponent,
    HomePage,
    TopCountriesComponent,
    TopCountriesComponent,
    LastMediaComponent,
    LastMediaItemsComponent,
  ],
  providers: [],
})
export class HomeModule {}
