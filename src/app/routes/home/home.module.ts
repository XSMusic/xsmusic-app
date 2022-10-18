import { NgModule } from '@angular/core';
import { HomePage } from './pages/home.page';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

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
  declarations: [HomePage],
  providers: [],
})
export class HomeModule {}
