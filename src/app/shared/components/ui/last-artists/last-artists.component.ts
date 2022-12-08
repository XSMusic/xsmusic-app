import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Artist } from '@models';

@Component({
  selector: 'last-artists',
  templateUrl: 'last-artists.component.html',
  animations: [inOutAnimation],
})
export class LastArtistsComponent {
  @Input() artists?: Artist[] = [];
  @Input() loading = true;
  @Input() error = false;
  @Output() goTo = new EventEmitter<{
    type: 'artist';
    typeRoute: 'all' | 'one';
    slug?: string;
  }>();
}
