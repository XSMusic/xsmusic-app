import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';

@Component({
  selector: 'artists-view-gallery',
  templateUrl: 'artists-view-gallery.component.html',
  animations: [inOutAnimation],
})
export class ArtistsViewGalleryComponent {
  @Input() artists: any[] = [];
  @Input() loading = true;
  @Output() goToProfile = new EventEmitter<string>();
  @Output() onScroll = new EventEmitter<void>();
}
