import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';

@Component({
  selector: 'artists-view-gallery',
  templateUrl: 'artists-view-gallery.component.html',
  animations: [inOutAnimation],
})
export class ArtistsViewGalleryComponent {
  @Input() artists: any[] = [];
  @Output() goToProfile = new EventEmitter<string>();
}
