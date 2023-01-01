import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Share, ShareOptions } from '@capacitor/share';
import { environment } from '@env/environment';
import { Like } from '@models';
import { ApiService, TOAST_STATE, UIService, UserService } from '@services';
import { GenericItemAllType, getTitleMedia } from '@shared/utils';
import { DateFunctions } from '@shared/utils/dates';

@Component({
  selector: 'block-sharing-report',
  templateUrl: 'block-sharing-report.component.html',
})
export class BlockSharingReportComponent {
  @Input() item: any;
  @Input() type!: GenericItemAllType;
  constructor(
    private ui: UIService,
    private router: Router,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  async sharing() {
    try {
      let title: string;
      if (this.type === 'set' || this.type === 'track') {
        title = `${this.item.name} @ ${
          this.item.site.name
        } - ${DateFunctions.new(this.item.site.date).format('DD-MM-YYYY')}`;
      } else if (this.type === 'event') {
        title = getTitleMedia(this.item);
      } else {
        title = this.item.name;
      }
      const shareData: ShareOptions = {
        title,
        url: `${environment.urls.app}${this.router.url}`,
      };
      await Share.share(shareData);
    } catch (error: any) {
      if (error.toString().indexOf('Share API not available in this browser')) {
        this.ui.toast.showToast(TOAST_STATE.info, 'Proximamente...');
      }
    }
  }

  likeOrDislike() {
    let type: any = this.type;
    if (this.type === 'club' || this.type === 'festival') {
      type = 'site';
    }
    const user = this.userService.getUser();
    console.log(user)
    const like = new Like({ type, [type]: this.item._id, user });
    this.apiService.create('likes', like).subscribe({
      next: () => {
        this.ui.toast.showToast(TOAST_STATE.info, 'Like OK');
      },
      error: () => {
        this.ui.toast.showToast(TOAST_STATE.error, 'Like KO');
      },
    });
  }

  report() {
    this.ui.toast.showToast(TOAST_STATE.info, 'Proximamente...');
  }
}
