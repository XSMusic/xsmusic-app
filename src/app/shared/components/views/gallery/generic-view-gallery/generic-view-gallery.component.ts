import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Image, Like } from '@models';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { ApiTypes, GalleryViewType } from '@shared/utils';

@Component({
  selector: 'generic-view-gallery',
  templateUrl: 'generic-view-gallery.component.html',
  animations: [inOutAnimation],
})
export class GenericViewGalleryComponent {
  @Input() items: any[] = [];
  @Input() type!: GalleryViewType;
  @Input() loading = true;
  @Input() cols = [];
  @Output() goToPage = new EventEmitter<GoToPageI>();
  @Output() onScroll = new EventEmitter<void>();
  @Output() discartEvent = new EventEmitter<any>();
  @Output() showImage = new EventEmitter<Image>();
  @Output() likeOrDislike = new EventEmitter<{ type: ApiTypes; like: Like }>();

  geTextNoItems() {
    switch (this.type) {
      case 'artist':
        return 'No hay artistas disponibles';
      case 'club':
        return 'No hay clubs disponibles';
      case 'event':
        return 'No hay eventos disponibles';
      case 'eventScraping':
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
