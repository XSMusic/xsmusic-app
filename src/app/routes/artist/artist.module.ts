import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ArtistBlockInfoComponent } from './components/block-info/artist-block-info.component';
import { ArtistLastMultiItemsComponent } from './components/last-multi-items/artist-last-multi-items.component';
import { ArtistBlockTracksComponent } from './components/block-tracks/artist-block-tracks.component';
import { ArtistPage } from './page/artist/artist.page';
import { ArtistsViewGalleryComponent } from './components/view-gallery/artists-view-gallery.component';
import { ArtistsPage } from './page/artists/artists.page';
import { ArtistLastMultiComponent } from './components/last-multi/artist-last-multi.component';

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
  declarations: [
    ArtistLastMultiComponent,
    ArtistBlockTracksComponent,
    ArtistLastMultiItemsComponent,
    ArtistPage,
    ArtistBlockInfoComponent,
    ArtistLastMultiItemsComponent,
    ArtistBlockTracksComponent,
    ArtistsPage,
    ArtistLastMultiComponent,
    ArtistsViewGalleryComponent,
  ],
  providers: [],
})
export class ArtistModule {}
