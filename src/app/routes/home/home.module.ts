import { NgModule } from '@angular/core';
import { HomePage } from './pages/home.page';
import { RouterModule } from '@angular/router';
import { TopCountriesComponent } from './components/top-countries/top-countries.component';
import { SharedModule } from '@shared/shared.module';

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
  declarations: [HomePage, TopCountriesComponent, TopCountriesComponent],
  providers: [],
})
export class HomeModule {}
