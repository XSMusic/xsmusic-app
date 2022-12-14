import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Artist, Image } from '@models';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { getYearsOld } from '@utils';

@Component({
  selector: 'artists-view-list',
  templateUrl: 'artists-view-list.component.html',
  animations: [inOutAnimation],
})
export class ArtistsViewListComponent {
  @Input() artists: Artist[] = [];
  @Input() loading = true;
  @Output() goToPage = new EventEmitter<GoToPageI>();
  @Output() filter = new EventEmitter<{ name: string; value: string }>();
  @Output() onScroll = new EventEmitter<void>();
  getYearsOld = getYearsOld;
  constructor(private fullImage: FullImageService) {}

  showImage(image: Image) {
    this.fullImage.show(image);
  }

  goToSocial(type: string) {
    window.open(type, '_black');
  }
}
