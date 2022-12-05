import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Image, Media } from '@models';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';

@Component({
  selector: 'media-view-list',
  templateUrl: 'media-view-list.component.html',
  animations: [inOutAnimation],
})
export class MediaViewListComponent {
  @Input() media: Media[] = [];
  @Input() type: 'sets' | 'tracks' = 'sets';
  @Input() loading = true;
  @Output() goToProfile = new EventEmitter<{
    type: 'site' | 'media';
    media: Media;
  }>();
  @Output() filter = new EventEmitter<{ name: string; value: string }>();
  @Output() onScroll = new EventEmitter<void>();
  constructor(private fullImage: FullImageService, private router: Router) {}

  showImage(image: Image) {
    this.fullImage.showImageFull(image);
  }

  goToOne(slug: string) {
    this.router.navigate([routesConfig.artist.replace(':slug', slug)]);
  }
}
