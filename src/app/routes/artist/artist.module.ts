import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ArtistPage } from './page/artist/artist.page';
import { ArtistsPage } from './page/artists/artists.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArtistsPage,
        data: { title: 'Artistas' },
      },
      {
        path: 'filter/:filterKey/:filterValue',
        component: ArtistsPage,
        data: { title: 'Artistas' },
      },
      {
        path: 'profile/:slug',
        component: ArtistPage,
        data: { title: 'Artista' },
      },
    ]),
  ],
  exports: [],
  declarations: [ArtistPage, ArtistsPage],
  providers: [],
})
export class ArtistModule {}
