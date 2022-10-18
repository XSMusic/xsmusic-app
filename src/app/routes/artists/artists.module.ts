import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ArtistsPage } from './pages/artists/artists.page';
import { ArtistPage } from './pages/artist/artist.page';
import { ArtistsViewGalleryComponent } from './components/view-gallery/artists-view-gallery.component';
import { ArtistsViewListComponent } from './components/view-list/artists-view-list.component';
import { ArtistBlockInfoComponent } from './components/block-info/artist-block-info.component';
import { ArtistsBlockButtonsComponent } from './components/block-buttons/artists-block-buttons.component';

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
    ArtistsBlockButtonsComponent,
    ArtistsViewListComponent,
    ArtistsViewGalleryComponent,
    ArtistBlockInfoComponent,
  ],
  providers: [],
})
export class ArtistsModule {}
