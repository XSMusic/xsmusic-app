import { NgModule } from '@angular/core';
import { ArtistsPage } from './pages/artists/artists.page';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ArtistsGalleryViewComponent } from './components/gallery-view/artists-gallery-view.component';
import { ArtistsListViewComponent } from './components/list-view/artists-list-view.component';
import { ArtistPage } from './pages/artist/artist.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArtistsPage,
        data: { breadcrumb: '', title: 'Artistas - Listado' },
      },
      {
        path: 'profile/:slug',
        component: ArtistPage,
        data: { breadcrumb: 'Perfil', title: 'Artistas - Perfil' },
      },
    ]),
  ],
  exports: [],
  declarations: [
    ArtistsPage,
    ArtistPage,
    ArtistsListViewComponent,
    ArtistsGalleryViewComponent,
  ],
  providers: [],
})
export class ArtistsModule {}
