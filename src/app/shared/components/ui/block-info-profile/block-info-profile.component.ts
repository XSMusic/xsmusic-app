import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Share, ShareOptions } from '@capacitor/share';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { environment } from '@env/environment';
import { TOAST_STATE, UIService } from '@services';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import {
  firstLetterCase,
  getYearsOld,
  GenericItemAllType,
} from '@shared/utils';
import { DateFunctions } from '@shared/utils/dates';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'block-info-profile',
  templateUrl: 'block-info-profile.component.html',
  animations: [inOutAnimation],
})
export class BlockInfoProfileComponent {
  @Input() item: any;
  @Input() type: GenericItemAllType = 'artist';
  moreInfo = false;
  getYearsOld = getYearsOld;

  constructor(
    private router: Router,
    private ui: UIService,
    private gaService: GoogleAnalyticsService,
  ) {}

  getDate = () => {
    const m = DateFunctions.new(this.item.date).locale('es');
    return `
      ${firstLetterCase(m.format('dddd D'))} de
      ${m.format('MMMM')} a las
      ${m.format('HH:mm')}
    `;
  };

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

  goToPage(data: GoToPageI) {
    this.ui.navigation.goToPage(data);
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
        url: `${environment.urls.app}${this.router.url}`,
      };
      await Share.share(shareData);
    } catch (error) {
      console.error(error);
      this.gaService.event(
        `${this.type}_sharing_ko`,
        `${this.type}_sharing`,
        this.type
      );
      this.ui.toast.showToast(TOAST_STATE.error, 'Error al compartir');
    }
  }

  report() {
    this.gaService.event(
      `${this.type}_report_ko`,
      `${this.type}_report`,
      this.type
    );
    this.ui.toast.showToast(TOAST_STATE.info, 'Proximamente...');
  }
}
