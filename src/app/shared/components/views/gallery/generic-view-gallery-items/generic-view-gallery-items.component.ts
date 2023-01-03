import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { GoToPageI } from '@shared/interfaces/goto.interface';

@Component({
  selector: 'generic-view-gallery-items',
  templateUrl: './generic-view-gallery-items.component.html',
  animations: [inOutAnimation],
})
export class GenericViewGalleryItemsComponent {
  @Input() items: any[] = [];
  @Input() type:
    | 'artist'
    | 'club'
    | 'event'
    | 'eventSite'
    | 'eventScraping'
    | 'set'
    | 'track'
    | 'festival' = 'artist';
  @Input() loading = true;
  @Output() goToPage = new EventEmitter<GoToPageI>();
  @Output() discartEvent = new EventEmitter<any>();
}
