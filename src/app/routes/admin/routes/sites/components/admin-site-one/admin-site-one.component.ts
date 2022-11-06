import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { MessageI } from '@interfaces';
import { Site, Style } from '@models';
import { ToastService, SiteService } from '@services';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { countries } from 'assets/data/countries';

@Component({
  selector: 'admin-site-one',
  templateUrl: 'admin-site-one.component.html',
  animations: [inOutAnimation],
})
export class AdminSiteOneComponent {
  @Input() site = new Site();
  @Input() styles: Style[] = [];
  countries = countries;
  types = [
    { name: 'Club', value: 'club' },
    { name: 'Festival', value: 'festival' },
  ];
  constructor(
    private siteService: SiteService,
    private fullImage: FullImageService,
    private toastService: ToastService,
    private router: Router
  ) {}

  showImage(image: string) {
    this.fullImage.showImageFull(image);
  }

  onSubmit() {
    const observable = this.site._id
      ? this.siteService.update(this.site)
      : this.siteService.create(this.site);
    observable.subscribe({
      next: (response) => this.onSuccess(response),
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  onDelete() {
    // TODO: Añadir confirmacion por modal
    this.siteService.deleteOne(this.site._id!).subscribe({
      next: (response) => this.onSuccess(response),
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  onSuccess(response: MessageI) {
    this.toastService.showToast(TOAST_STATE.success, response.message);
    this.router.navigate([routesConfig.clubsAdmin]);
  }

  onClickStyleItem(item: { name: string; _id: string }) {
    this.site.styles = this.site.styles?.filter(
      (style) => style.name !== item.name
    );
  }

  onChangeStyleSelect(e: any) {
    if (this.site.styles!.length <= 3) {
      const newStyle = this.styles.find(
        (style) => style._id!.toString() === e.target.value.toString()
      );
      this.site.styles?.push(newStyle);
    } else {
      this.toastService.showToast(
        TOAST_STATE.warning,
        'No puedes añadir mas de 3 estilos'
      );
    }
  }
}
