import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Media } from '@models';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';

@Component({
  selector: 'media-list-view',
  templateUrl: 'media-list-view.component.html',
  animations: [inOutAnimation],
})
export class MediaListViewComponent {
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
    this.router.navigate(['/artists/profile', slug]);
  }
}
