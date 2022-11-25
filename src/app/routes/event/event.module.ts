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
        data: { title: 'Eventos' },
      },
      {
        path: 'filter/:filterKey/:filterValue',
        component: EventsPage,
        data: { title: 'Eventos' },
      },
      {
        path: 'one/:slug',
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
