import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Share, ShareOptions } from '@capacitor/share';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { environment } from '@env/environment';
import { ToastService, TOAST_STATE } from '@services';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { getYearsOld } from '@shared/utils';

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
    private toastService: ToastService
  ) {}

  showImage(image: string) {
    this.fullImage.showImageFull(image);
  }

  goToEdit(id: string) {
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

    this.router.navigate([
      route.replace(':filterKey', key).replace(':filterValue', value),
    ]);
  }

  goToSocial(type: string) {
    window.open(type, '_black');
  }

  async sharing() {
    try {
      let text = '';
      if (this.type === 'artist') {
        text = 'Te recomiendo este artista';
      } else if (this.type === 'club') {
        text = 'Te recomiendo este club';
      } else if (this.type === 'event') {
        text = 'Te recomiendo este evento';
      } else if (this.type === 'festival') {
        text = 'Te recomiendo este festival';
      }
      const shareData: ShareOptions = {
        title: this.item.name,
        text,
        url: `${environment.APP_URL}${this.router.url}`,
      };
      await Share.share(shareData);
    } catch (error) {
      this.toastService.showToast(TOAST_STATE.error, 'Error al compartir');
    }
  }

  report() {
    this.toastService.showToast(TOAST_STATE.info, 'Proximamente...');
  }
}
