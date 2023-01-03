import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Media } from '@models';

@Component({
  selector: 'last-media-items',
  templateUrl: 'last-media-items.component.html',
  animations: [inOutAnimation],
})
export class LastMediaItemsComponent {
  @Input() media: Media[] = [];
  @Input() loading = true;
  constructor(private router: Router) {}

  goToMedia(item: Media) {
    const route =
      item.type === 'set'
        ? [routesConfig.set.replace(':slug', item.slug!)]
        : [routesConfig.track.replace(':slug', item.slug!)];
    this.router.navigate(route);
  }
}
