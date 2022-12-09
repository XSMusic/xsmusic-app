import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { FestivalPage } from './pages/festival/festival.page';
import { FestivalsPage } from './pages/festivals/festivals.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: FestivalsPage,
        data: {
          title: 'Festivales',
          description: 'Listado de festivales de musica electronica',
        },
      },
      {
        path: ':slug',
        component: FestivalPage,
      },
    ]),
  ],
  exports: [],
  declarations: [FestivalsPage, FestivalPage],
  providers: [],
})
export class FestivalsModule {}
