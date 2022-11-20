import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AdminEventPage } from './pages/event/admin-event.page';
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
      {
        path: 'one/:id',
        component: AdminEventPage,
        data: { breadcrumb: 'Editar Evento', title: 'Admin - Editar Evento' },
      },
      {
        path: 'one',
        component: AdminEventPage,
        data: { breadcrumb: 'Nuevo Evento', title: 'Admin - Nuevo Evento' },
      },
    ]),
  ],
  exports: [],
  declarations: [AdminEventsPage, AdminEventPage],
  providers: [],
})
export class AdminEventsModule {}
