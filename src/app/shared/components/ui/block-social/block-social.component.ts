import { Component, Input } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'block-social',
  templateUrl: 'block-social.component.html',
})
export class BlockSocialComponent {
  @Input() item!: any;
  @Input() type: 'artist' | 'club' | 'event' | 'festival' = 'artist';

  constructor(private gaService: GoogleAnalyticsService) {}

  goToSocial(type: string, link: string) {
    this.gaService.event(
      `${this.type}_link_social_${type}`,
      `${this.type}_link_social`,
      this.type
    );
    window.open(link, '_black');
  }
}
