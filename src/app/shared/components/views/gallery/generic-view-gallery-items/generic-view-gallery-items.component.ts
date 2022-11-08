import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';

@Component({
  selector: 'generic-view-gallery-items',
  templateUrl: './generic-view-gallery-items.component.html',
  animations: [inOutAnimation],
})
export class GenericViewGalleryItemsComponent {
  @Input() items: any[] = [];
  @Output() goToOne = new EventEmitter<any>();
}
