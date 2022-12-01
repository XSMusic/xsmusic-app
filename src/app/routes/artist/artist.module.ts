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
        data: {
          title: 'Artistas',
          description: 'Listado de artistas de musica electronica',
        },
      },
      {
        path: 'filter/:filterKey/:filterValue',
        component: ArtistsPage,
        data: {
          title: 'Artistas',
          description: 'Listado de artistas de musica electronica',
        },
      },
      {
        path: 'profile/:slug',
        component: ArtistPage,
      },
    ]),
  ],
  exports: [],
  declarations: [ArtistPage, ArtistsPage],
  providers: [],
})
export class ArtistModule {}
