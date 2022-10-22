import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminArtistsPage } from './pages/admin-artists.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminArtistsPage,
        data: { breadcrumb: '', title: 'Artistas' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminArtistsPage],
  providers: [],
})
export class AdminArtistsModule {}
