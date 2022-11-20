import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Event } from '@models';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { getYearsOld } from '@utils';

@Component({
  selector: 'events-view-list',
  templateUrl: 'events-view-list.component.html',
  animations: [inOutAnimation],
})
export class EventsViewListComponent {
  @Input() items: Event[] = [];
  @Input() loading = true;
  @Output() goToProfile = new EventEmitter<{
    type: 'site' | 'event';
    event: Event;
  }>();
  @Output() filter = new EventEmitter<{ name: string; value: string }>();
  @Output() onScroll = new EventEmitter<void>();
  getYearsOld = getYearsOld;
  constructor(private fullImage: FullImageService) {}

  showImage(image: string) {
    this.fullImage.showImageFull(image);
  }
}
