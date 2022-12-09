import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminArtistsPage } from './pages/artists/admin-artists.page';
import { AdminArtistPage } from './pages/artist/admin-artist.page';
import { ArtistOneComponent } from './components/artist-one/admin-artist-one.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminArtistsPage,
        data: { breadcrumb: '', title: 'Admin - Artistas' },
      },
      {
        path: ':id',
        component: AdminArtistPage,
        data: { breadcrumb: 'Editar Artista', title: 'Admin - Editar Artista' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminArtistsPage, AdminArtistPage, ArtistOneComponent],
  providers: [],
})
export class AdminArtistsModule {}
