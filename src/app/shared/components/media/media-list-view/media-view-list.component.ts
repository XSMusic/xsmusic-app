import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Media } from '@models';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';

@Component({
  selector: 'media-view-list',
  templateUrl: 'media-view-list.component.html',
  animations: [inOutAnimation],
})
export class MediaViewListComponent {
  @Input() media: Media[] = [];
  @Input() loading = true;
  @Output() goToProfile = new EventEmitter<Media>();
  @Output() filter = new EventEmitter<{ name: string; value: string }>();
  @Output() onScroll = new EventEmitter<void>();
  constructor(private fullImage: FullImageService, private router: Router) {}

  showImage(image: string) {
    this.fullImage.showImageFull(image);
  }

  goToArtistProfile(slug: string) {
    this.router.navigate([routesConfig.artist.replace(':slug', slug)]);
  }
}
