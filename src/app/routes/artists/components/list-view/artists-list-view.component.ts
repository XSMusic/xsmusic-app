import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';

@Component({
  selector: 'artists-list-view',
  templateUrl: 'artists-list-view.component.html',
  animations: [inOutAnimation],
})
export class ArtistsListViewComponent {
  @Input() artists: any[] = [];
  @Output() goToProfile = new EventEmitter<string>();
}
