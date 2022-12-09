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
    const type = `${this.type}s`;
    const route = `${routesConfig[type]}`;
    this.router.navigate([route], {
      queryParams: {
        key,
        value,
      },
    });
    this.gaService.event(
      `${this.type}_filter_${key.toLowerCase()}_${value.toLowerCase()}`,
      `${this.type}_link`,
      this.type
    );
  }
}
