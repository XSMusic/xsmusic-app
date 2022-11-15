import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Artist, Image, Media } from '@models';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';

@Component({
  selector: 'artist-last-multi-items',
  templateUrl: './artist-last-multi-items.component.html',
  animations: [inOutAnimation],
})
export class ArtistLastMultiItemsComponent implements OnInit {
  @Input() artist!: Artist;
  @Input() type: 'set' | 'track' | 'image' = 'set';
  items: any[] = [];

  constructor(
    private router: Router,
    private fullImageService: FullImageService
  ) {}

  ngOnInit() {
    if (this.type === 'set') {
      this.items = this.artist.sets;
    }
    if (this.type === 'track') {
      this.items = this.artist.tracks;
    } else if (this.type === 'image') {
      this.items = this.artist.images!;
    }
  }

  goTo(item: Media) {
    const route =
      this.type === 'set'
        ? [routesConfig.set.replace(':slug', item.slug!)]
        : this.type === 'track'
        ? [routesConfig.track.replace(':slug', item.slug!)]
        : [];
    this.router.navigate(route);
  }

  showFullImage(item: Image) {
    this.fullImageService.showImageFull(item.url!);
  }
}
