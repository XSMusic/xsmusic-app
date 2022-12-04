import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { Site } from '@models';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'block-info-profile-address',
  templateUrl: 'block-info-profile-address.component.html',
})
export class BlockInfoProfileAddressComponent {
  @Input() item!: Site;
  @Input() type: 'artist' | 'club' | 'event' | 'festival' = 'artist';

  constructor(
    private gaService: GoogleAnalyticsService,
    private router: Router
  ) {}

  goToFilter(key: string, value: string) {
    let route = '';
    if (this.type === 'artist') {
      route = routesConfig.artistsFilter;
    } else if (this.type === 'club') {
      route = routesConfig.clubsFilter;
    } else if (this.type === 'event') {
      route = routesConfig.eventsFilter;
    } else if (this.type === 'festival') {
      route = routesConfig.festivalsFilter;
    }
    this.gaService.event(
      `${this.type}_filter_${key.toLowerCase()}_${value.toLowerCase()}`,
      `${this.type}_link`,
      this.type
    );

    this.router.navigate([
      route.replace(':filterKey', key).replace(':filterValue', value),
    ]);
  }
}
