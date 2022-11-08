import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Media, Site } from '@models';

@Component({
  selector: 'site-last-media-items',
  templateUrl: './site-last-media-items.component.html',
  animations: [inOutAnimation],
})
export class SiteLastMediaItemsComponent implements OnInit {
  @Input() site!: Site;
  @Input() type = 'set';
  items: Media[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.type === 'set') {
      this.items = this.site.sets;
    } else {
      this.items = this.site.events;
    }
  }

  goTo(item: Media) {
    this.router.navigate([routesConfig.set.replace(':slug', item.slug!)]);
  }
}
