import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminArtistsPage } from './pages/artists/admin-artists.page';
import { AdminArtistPage } from './pages/artist/admin-artist.page';

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
        data: { breadcrumb: '', title: 'Editar Artista' },
      },
      {
        path: 'one',
        component: AdminArtistPage,
        data: { breadcrumb: '', title: 'Nuevo Artista' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminArtistsPage, AdminArtistPage],
  providers: [],
})
export class AdminArtistsModule {}
