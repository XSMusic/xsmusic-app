import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Image, Media } from '@models';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';

@Component({
  selector: 'last-multi-items',
  templateUrl: './last-multi-items.component.html',
  animations: [inOutAnimation],
})
export class LastMultiItemsComponent implements OnInit {
  @Input() item!: any;
  @Input() type: 'set' | 'event' | 'track' | 'image' = 'set';
  items: any[] = [];

  constructor(
    private router: Router,
    private fullImageService: FullImageService
  ) {}

  ngOnInit() {
    if (this.type === 'set') {
      this.items = this.item.sets;
    }
    if (this.type === 'track') {
      this.items = this.item.tracks;
    } else if (this.type === 'image') {
      this.items = this.item.images!;
    }
  }

  goTo(item: Media) {
    let route = '';
    if (this.type === 'set') {
      route = routesConfig.set.replace(':slug', item.slug!);
    } else if (this.type === 'track') {
      route = routesConfig.track.replace(':slug', item.slug!);
    }
    this.router.navigate([route]);
  }

  showFullImage(item: Image) {
    this.fullImageService.showImageFull(item);
  }
}
