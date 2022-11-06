import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Club } from '@models';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { getYearsOld } from '@utils';

@Component({
  selector: 'clubs-view-list',
  templateUrl: 'clubs-view-list.component.html',
  animations: [inOutAnimation],
})
export class ClubViewListComponent {
  @Input() clubs: Club[] = [];
  @Input() loading = true;
  @Output() goToProfile = new EventEmitter<Club>();
  @Output() filter = new EventEmitter<{ name: string; value: string }>();
  @Output() onScroll = new EventEmitter<void>();
  getYearsOld = getYearsOld;
  constructor(private fullImage: FullImageService) {}

  showImage(image: string) {
    this.fullImage.showImageFull(image);
  }
}
