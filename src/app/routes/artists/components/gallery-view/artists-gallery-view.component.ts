import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';

@Component({
  selector: 'artists-gallery-view',
  templateUrl: 'artists-gallery-view.component.html',
  animations: [inOutAnimation],
})
export class ArtistsGalleryViewComponent {
  @Input() artists: any[] = [];
  @Output() goToProfile = new EventEmitter<string>();
}
