import { TracksPage } from './pages/tracks/tracks.page';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { TrackPage } from './pages/track/track.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TracksPage,
        data: { title: 'Tracks' },
      },
      {
        path: 'filter/:filterKey/:filterValue',
        component: TracksPage,
        data: { title: 'Tracks' },
      },
      {
        path: 'one/:id',
        component: TrackPage,
        data: { breadcrumb: 'Track', title: 'Track' },
      },
    ]),
  ],
  exports: [],
  declarations: [TracksPage, TrackPage],
  providers: [],
})
export class TracksModule {}
