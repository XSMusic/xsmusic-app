import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ArtistBlockInfoComponent } from './components/block-info/artist-block-info.component';
import { ArtistBlockImageInfoComponent } from './components/block-image-info/artist-block-image-info.component';
import { ArtistBlockSetsComponent } from './components/block-sets/artist-block-sets.component';
import { ArtistBlockTracksComponent } from './components/block-tracks/artist-block-tracks.component';
import { ArtistPage } from './page/artist/artist.page';
import { ArtistsViewGalleryComponent } from './components/view-gallery/artists-view-gallery.component';
import { ArtistsPage } from './page/artists/artists.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArtistsPage,
        data: { title: 'Artista' },
      },
      {
        path: 'filter/:filterKey/:filterValue',
        component: ArtistsPage,
        data: { title: 'Artista' },
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
    ArtistBlockTracksComponent,
    ArtistBlockSetsComponent,
    ArtistPage,
    ArtistBlockImageInfoComponent,
    ArtistBlockInfoComponent,
    ArtistBlockSetsComponent,
    ArtistBlockTracksComponent,
    ArtistsPage,
    ArtistsViewGalleryComponent,
  ],
  providers: [],
})
export class ArtistModule {}
