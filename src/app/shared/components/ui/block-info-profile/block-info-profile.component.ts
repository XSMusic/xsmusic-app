import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Share, ShareOptions } from '@capacitor/share';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { environment } from '@env/environment';
import { ToastService, TOAST_STATE } from '@services';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { getYearsOld } from '@shared/utils';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'block-info-profile',
  templateUrl: 'block-info-profile.component.html',
  animations: [inOutAnimation],
})
export class BlockInfoProfileComponent {
  @Input() item: any;
  @Input() type: 'artist' | 'club' | 'event' | 'festival' = 'artist';
  moreInfo = false;
  getYearsOld = getYearsOld;

  constructor(
    private fullImage: FullImageService,
    private router: Router,
    private toastService: ToastService,
    private gaService: GoogleAnalyticsService
  ) {}

  showImage(image: string) {
    this.gaService.event(
      `${this.type}_show_image`,
      `${this.type}_show_image`,
      this.type
    );
    this.fullImage.showImageFull(image);
  }

  goToAdmin(id: string) {
    let route = '';
    if (this.type === 'artist') {
      route = routesConfig.artistAdmin;
    } else if (this.type === 'club') {
      route = routesConfig.clubAdmin;
    } else if (this.type === 'event') {
      route = routesConfig.eventAdmin;
    } else if (this.type === 'festival') {
      route = routesConfig.festivalAdmin;
    }
    this.gaService.event(
      `${this.type}_link_admin`,
      `${this.type}_link`,
      this.type
    );
    this.router.navigate([route.replace(':id', id)]);
  }

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

  goToSocial(type: string, link: string) {
    this.gaService.event(
      `${this.type}_link_social_${type}`,
      `${this.type}_link_social`,
      this.type
    );
    window.open(link, '_black');
  }

  goToProfile(type: string, item: any) {
    let route = '';
    if (type === 'site') {
      if (item.site.type === 'club') {
        route = routesConfig.club.replace(':slug', item.site.slug);
      } else {
        route = routesConfig.festival.replace(':slug', item.site.slug);
      }
    }
    this.gaService.event(
      `${this.type}_link_${type}`,
      `${this.type}_link`,
      this.type
    );
    this.router.navigate([route]);
  }

  async sharing() {
    try {
      this.gaService.event(
        `${this.type}_sharing_ok`,
        `${this.type}_sharing`,
        this.type
      );
      const shareData: ShareOptions = {
        title: this.item.name,
        url: `${environment.APP_URL}${this.router.url}`,
      };
      await Share.share(shareData);
    } catch (error) {
      this.gaService.event(
        `${this.type}_sharing_ko`,
        `${this.type}_sharing`,
        this.type
      );
      this.toastService.showToast(TOAST_STATE.error, 'Error al compartir');
    }
  }

  report() {
    this.gaService.event(
      `${this.type}_report_ko`,
      `${this.type}_report`,
      this.type
    );
    this.toastService.showToast(TOAST_STATE.info, 'Proximamente...');
  }
}
