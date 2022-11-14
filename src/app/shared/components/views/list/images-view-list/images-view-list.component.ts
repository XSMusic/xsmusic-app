import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { Image } from '@models';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';

@Component({
  selector: 'images-view-list',
  templateUrl: 'images-view-list.component.html',
})
export class ImagesViewListComponent {
  @Input() items: Image[] = [];
  @Input() type: 'sets' | 'tracks' = 'sets';
  @Input() loading = true;
  @Output() filter = new EventEmitter<{ name: string; value: string }>();
  @Output() onScroll = new EventEmitter<void>();
  @Output() onDeleteImage = new EventEmitter<Image>();
  constructor(private fullImage: FullImageService, private router: Router) {}

  showImage(image: string) {
    this.fullImage.showImageFull(image);
  }

  goToOne(slug: string) {
    this.router.navigate([routesConfig.artist.replace(':slug', slug)]);
  }
}
