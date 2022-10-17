import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        data: { breadcrumb: '', title: 'Inicio' },
      },
    ]),
  ],
  exports: [],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule {}
