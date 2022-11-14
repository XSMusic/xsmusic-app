import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Youtube } from '@models';

@Component({
  selector: 'admin-media-add-search-items',
  templateUrl: './admin-media-add-search-items.component.html',
  animations: [inOutAnimation],
})
export class AdminMediaAddSearchItemsComponent {
  @Input() items: Youtube[] = [];
  @Input() itemSelected!: Youtube;
  @Output() selectItem = new EventEmitter<Youtube>();

  goToYoutube(item: Youtube) {
    window.open(`https://www.youtube.com/watch?v=${item.videoId}`, '_blank');
  }
}
