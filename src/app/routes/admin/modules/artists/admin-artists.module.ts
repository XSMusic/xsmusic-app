import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminArtistsPage } from './pages/artists/admin-artists.page';
import { AdminArtistPage } from './pages/artist/admin-artist.page';
import { ArtistOneComponent } from './components/artist-one/artist-one.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminArtistsPage,
        data: { breadcrumb: '', title: 'Artistas' },
      },
      {
        path: 'one/:id',
        component: AdminArtistPage,
        data: { breadcrumb: 'Editar Artista', title: 'Editar Artista' },
      },
      {
        path: 'one',
        component: AdminArtistPage,
        data: { breadcrumb: 'Nuevo Artista', title: 'Nuevo Artista' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminArtistsPage, AdminArtistPage, ArtistOneComponent],
  providers: [],
})
export class AdminArtistsModule {}
