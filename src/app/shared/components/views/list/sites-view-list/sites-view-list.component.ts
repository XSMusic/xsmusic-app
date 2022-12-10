import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Image, Site } from '@models';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { getYearsOld } from '@utils';

@Component({
  selector: 'sites-view-list',
  templateUrl: 'sites-view-list.component.html',
  animations: [inOutAnimation],
})
export class SitesViewListComponent {
  @Input() sites: Site[] = [];
  @Input() loading = true;
  @Input() type: 'clubs' | 'festivals' = 'clubs';
  @Output() goToPage = new EventEmitter<GoToPageI>();
  @Output() filter = new EventEmitter<{ name: string; value: string }>();
  @Output() onScroll = new EventEmitter<void>();
  getYearsOld = getYearsOld;
  constructor(private fullImage: FullImageService) {}

  showImage(image: Image) {
    this.fullImage.showImageFull(image);
  }

  goToSocial(type: string) {
    window.open(type, '_black');
  }
}
