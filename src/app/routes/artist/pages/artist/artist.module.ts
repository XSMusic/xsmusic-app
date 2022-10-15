import { NgModule } from '@angular/core';
import { ArtistPage } from './artist.page';
import { ArtistsPage } from '../artists/artists.page';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ArtistsGalleryViewComponent } from '../../components/gallery-view/artists-gallery-view.component';
import { ArtistsListViewComponent } from '../../components/list-view/artists-list-view.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: ArtistsPage,
        data: { breadcrumb: 'Listado', title: 'Artistas - Listado' },
      },
      {
        path: 'one/:id',
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
