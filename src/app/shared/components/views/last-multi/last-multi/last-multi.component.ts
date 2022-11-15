import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '../../../../../core/config/routes.config';

@Component({
  selector: 'last-multi',
  templateUrl: './last-multi.component.html',
  animations: [inOutAnimation],
})
export class LastMultiComponent {
  @Input() views: any[] = [];
  @Input() item!: any;
  view = 'set';

  constructor(private router: Router) {}

  goToOne(event: any) {
    let route = '';
    if (this.view === 'set') {
      route = routesConfig.set.replace(':slug', event.slug);
    } else if (this.view === 'track') {
      route = routesConfig.track.replace(':slug', event.slug);
    }

    this.router.navigate([route]);
  }
}
