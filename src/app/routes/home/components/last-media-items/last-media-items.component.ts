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
  width = window.innerWidth;
  constructor(private router: Router) {}

  goToMedia(item: Media) {
    const route = item.type === 'set' ? routesConfig.set : routesConfig.track;
    this.router.navigate([route.replace(':id', item._id!)]);
  }
}
