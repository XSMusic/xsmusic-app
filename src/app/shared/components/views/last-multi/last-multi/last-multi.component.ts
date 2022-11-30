import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';

@Component({
  selector: 'last-multi',
  templateUrl: './last-multi.component.html',
  animations: [inOutAnimation],
})
export class LastMultiComponent implements OnInit {
  @Input() views: any[] = [];
  @Input() item!: any;
  view = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.view = this.views[0].value;
  }

  goToOne(event: any) {
    let route = '';
    if (this.view === 'set') {
      route = routesConfig.set.replace(':slug', event.slug);
    } else if (this.view === 'track') {
      route = routesConfig.track.replace(':slug', event.slug);
    } else if (this.view === 'event' || this.view === 'eventSite') {
      route = routesConfig.event.replace(':slug', event.slug);
    } else if (this.view === 'artist') {
      route = routesConfig.artist.replace(':slug', event.slug);
    }

    this.router.navigate([route]);
  }
}
