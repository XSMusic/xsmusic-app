import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Event, Image } from '@models';
import { GoToPageI } from '@shared/interfaces/goto.interface';
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
  @Output() goToPage = new EventEmitter<GoToPageI>();
  @Output() filter = new EventEmitter<{ name: string; value: string }>();
  @Output() onScroll = new EventEmitter<void>();
  getYearsOld = getYearsOld;
  constructor(private fullImage: FullImageService) {}

  showImage(image: Image) {
    this.fullImage.showImageFull(image);
  }
}
