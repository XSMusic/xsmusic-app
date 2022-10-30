import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ArtistsPage } from './pages/artists/artists.page';
import { ArtistPage } from './pages/artist/artist.page';
import { ArtistsViewGalleryComponent } from './components/view-gallery/artists-view-gallery.component';
import { ArtistBlockInfoComponent } from './components/block-info/artist-block-info.component';
import { ArtistBlockImageInfoComponent } from './components/block-image-info/artist-block-image-info.component';

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
    ArtistsViewGalleryComponent,
    ArtistBlockImageInfoComponent,
    ArtistBlockInfoComponent,
  ],
  providers: [],
})
export class ArtistsModule {}
