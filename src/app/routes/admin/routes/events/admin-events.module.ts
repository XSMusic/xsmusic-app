import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminEventsPage } from './pages/events/admin-events.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminEventsPage,
        data: { breadcrumb: '', title: 'Admin - Eventos' },
      },
      // {
      //   path: 'one/:id',
      //   component: AdminArtistPage,
      //   data: { breadcrumb: 'Editar Artista', title: 'Admin - Editar Artista' },
      // },
      // {
      //   path: 'one',
      //   component: AdminArtistPage,
      //   data: { breadcrumb: 'Nxwuevo Artista', title: 'Admin - Nuevo Artista' },
      // },
    ]),
  ],
  exports: [],
  declarations: [AdminEventsPage],
  providers: [],
})
export class AdminEventsModule {}
