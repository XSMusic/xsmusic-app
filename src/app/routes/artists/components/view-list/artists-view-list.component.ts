import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Artist } from '@models';
import { getYearsOld } from '@utils';

@Component({
  selector: 'artists-view-list',
  templateUrl: 'artists-view-list.component.html',
  animations: [inOutAnimation],
})
export class ArtistsViewListComponent {
  @Input() artists: Artist[] = [];
  @Input() loading = true;
  @Output() goToProfile = new EventEmitter<string>();
  @Output() filter = new EventEmitter<{ name: string; value: string }>();
  @Output() onScroll = new EventEmitter<void>();
  getYearsOld = getYearsOld;
}
