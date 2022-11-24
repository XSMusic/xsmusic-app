import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';

@Component({
  selector: 'generic-view-gallery',
  templateUrl: 'generic-view-gallery.component.html',
  animations: [inOutAnimation],
})
export class GenericViewGalleryComponent {
  @Input() items: any[] = [];
  @Input() type: 'artist' | 'club' | 'event' | 'eventScraping' | 'set' | 'track' | 'festival' = 'artist';
  @Input() loading = true;
  @Input() cols = [];
  @Output() goToOne = new EventEmitter<any>();
  @Output() onScroll = new EventEmitter<void>();

  geTextNoItems() {
    switch (this.type) {
      case 'artist':
        return 'No hay artistas disponibles';
      case 'club':
        return 'No hay clubs disponibles';
      case 'event':
        return 'No hay eventos disponibles';
      case 'set':
        return 'No hay sets disponibles';
      case 'track':
        return 'No hay tracks disponibles';
      case 'festival':
        return 'No hay festivales disponibles';
      default:
        return '';
    }
  }
}
