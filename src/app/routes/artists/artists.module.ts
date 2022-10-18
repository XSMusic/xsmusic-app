import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ArtistsPage } from './pages/artists/artists.page';
import { ArtistPage } from './pages/artist/artist.page';
import { ArtistsGalleryViewComponent } from './components/gallery-view/artists-gallery-view.component';
import { ArtistsListViewComponent } from './components/list-view/artists-list-view.component';
import { ArtistInfoBlockComponent } from './components/info-block/artist-info-block.component';
import { ArtistsButtonsBlockComponent } from './components/buttons-block/artists-buttons-block.component';

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
    ArtistsButtonsBlockComponent,
    ArtistsListViewComponent,
    ArtistsGalleryViewComponent,
    ArtistInfoBlockComponent,
  ],
  providers: [],
})
export class ArtistsModule {}
