import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';

@Component({
  selector: 'artists-view-list',
  templateUrl: 'artists-view-list.component.html',
  animations: [inOutAnimation],
})
export class ArtistsViewListComponent {
  @Input() artists: any[] = [];
  @Output() goToProfile = new EventEmitter<string>();
}
