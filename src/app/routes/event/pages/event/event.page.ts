import { Component } from '@angular/core';
import { GenericOneBase } from '@components';

@Component({
  selector: 'page-event',
  template: `<generic-one-base type="event"></generic-one-base>`,
})
export class EventPage extends GenericOneBase {}
