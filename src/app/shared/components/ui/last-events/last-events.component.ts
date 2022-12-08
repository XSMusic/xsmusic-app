import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Event } from '@models';

@Component({
  selector: 'last-events',
  templateUrl: 'last-events.component.html',
  animations: [inOutAnimation],
})
export class LastEventsComponent {
  @Input() events!: Event[];
  @Input() loading = true;
  @Input() error = false;
  @Output() goTo = new EventEmitter<{
    type: 'event' | 'club' | 'festival';
    typeRoute: 'all' | 'one';
    slug?: string;
  }>();
}
