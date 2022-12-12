import { Component } from '@angular/core';
import { GenericListBase } from '@components';

@Component({
  selector: 'events',
  template: `<generic-list-base type="event"></generic-list-base>`,
})
export class EventsPage extends GenericListBase {}
