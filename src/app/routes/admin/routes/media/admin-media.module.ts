import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminMediaAddPage } from './pages/add/admin-media-add.page';
import { AdminMediaPage } from './pages/media/admin-media.page';
import { AdminMediasPage } from './pages/medias/admin-medias.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '*', redirectTo: 'sets', pathMatch: 'full' },
      { path: '', redirectTo: 'sets', pathMatch: 'full' },
      {
        path: 'sets',
        component: AdminMediasPage,
        data: { breadcrumb: '', title: 'Sets' },
      },
      {
        path: 'sets/:id',
        component: AdminMediaPage,
        data: { breadcrumb: 'Editar Set', title: 'Editar Set' },
      },
      {
        path: 'tracks',
        component: AdminMediasPage,
        data: { breadcrumb: '', title: 'Tracks' },
      },
      {
        path: 'tracks/:id',
        component: AdminMediaPage,
        data: { breadcrumb: 'Editar Track', title: 'Editar Track' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminMediasPage, AdminMediaAddPage, AdminMediaPage],
  providers: [],
})
export class AdminMediaModule {}
