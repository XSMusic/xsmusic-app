import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { EventsPage } from './pages/events/events.page';
import { EventPage } from './pages/event/event.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: EventsPage,
        data: {
          title: 'Eventos',
          description: 'Listado de eventos de musica electronica',
        },
      },
      {
        path: ':slug',
        component: EventPage,
        data: { title: 'Evento' },
      },
    ]),
  ],
  exports: [],
  declarations: [EventPage, EventsPage],
  providers: [],
})
export class EventModule {}
