import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Share, ShareOptions } from '@capacitor/share';
import { environment } from '@env/environment';
import { TOAST_STATE, UIService } from '@services';
import { getTitleMedia } from '@shared/utils';
import { DateFunctions } from '@shared/utils/dates';

@Component({
  selector: 'block-sharing-report',
  templateUrl: 'block-sharing-report.component.html',
})
export class BlockSharingReportComponent {
  @Input() item: any;
  @Input() type!: 'artist' | 'club' | 'event' | 'festival' | 'set' | 'track';
  constructor(private ui: UIService, private router: Router) {}

  async sharing() {
    try {
      const shareData: ShareOptions = {
        title:
          this.type === 'set' || this.type === 'track'
            ? getTitleMedia(this.item)
            : this.type === 'event'
            ? `${this.item.name} @ ${this.item.site.name} - ${DateFunctions.new(
                this.item.site.date
              ).format('DD-MM-YYYY')}`
            : this.item.name,
        url: `${environment.urls.app}${this.router.url}`,
      };
      await Share.share(shareData);
    } catch (error: any) {
      if (error.toString().indexOf('Share API not available in this browser')) {
        this.ui.toast.showToast(TOAST_STATE.info, 'Proximamente...');
      }
    }
  }

  report() {
    this.ui.toast.showToast(TOAST_STATE.info, 'Proximamente...');
  }
}
