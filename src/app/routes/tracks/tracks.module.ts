import { TracksPage } from './pages/tracks/tracks.page';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TracksPage,
        data: { breadcrumb: '', title: 'Tracks - Listado' },
      },
    ]),
  ],
  exports: [],
  declarations: [TracksPage],
  providers: [],
})
export class TracksModule {}
