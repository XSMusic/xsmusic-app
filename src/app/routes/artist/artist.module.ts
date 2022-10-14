import { NgModule } from '@angular/core';
import { ArtistsPage } from './pages/artists.page';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ArtistsGalleryViewComponent } from './components/gallery-view/artists-gallery-view.component';
import { ArtistsListViewComponent } from './components/list-view/artists-list-view.component';

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
    ]),
  ],
  exports: [],
  declarations: [
    ArtistsPage,
    ArtistsListViewComponent,
    ArtistsGalleryViewComponent,
  ],
  providers: [],
})
export class ArtistsModule {}
