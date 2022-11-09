import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { FestivalBlockInfoComponent } from './components/block-info/festival-block-info.component';
import { FestivalPage } from './pages/festival/festival.page';
import { FestivalsPage } from './pages/festivals/festivals.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: FestivalsPage,
        data: { breadcrumb: '', title: 'Festivales' },
      },
      {
        path: 'filter/:filterKey/:filterValue',
        component: FestivalsPage,
        data: { title: 'Festivales' },
      },
      {
        path: 'one/:slug',
        component: FestivalPage,
        data: { title: 'Festival' },
      },
    ]),
  ],
  exports: [],
  declarations: [FestivalsPage, FestivalPage, FestivalBlockInfoComponent],
  providers: [],
})
export class FestivalsModule {}