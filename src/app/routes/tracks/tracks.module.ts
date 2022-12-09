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
        data: {
          title: 'Tracks',
          description: 'Listado de tracks de musica electronica',
        },
      },
      {
        path: ':slug',
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
