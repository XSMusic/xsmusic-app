import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import {
  MessageI,
  ScrapingGetInfoClubDto,
  ScrapingGetInfoClubResponse,
} from '@interfaces';
import { Site, Style } from '@models';
import { ToastService, SiteService, ScrapingService, GeoService } from '@services';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { countries } from 'assets/data/countries';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private router: Router,
    private spinner: NgxSpinnerService,
    private scrapingService: ScrapingService,
    private geoService: GeoService
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
    this.router.navigate([
      this.site.type === 'club'
        ? routesConfig.clubsAdmin
        : routesConfig.festivalsAdmin,
    ]);
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

  onKeyUpName() {
    this.spinner.show();
    const body: ScrapingGetInfoClubDto = {
      name: this.site.name!,
      poblation: this.site.address.poblation,
    };
    this.scrapingService.getInfoClub(body).subscribe({
      next: (response) => this.setClubFromScraping(response),
      error: (error) => {
        this.toastService.showToast(TOAST_STATE.error, error);
        this.spinner.hide();
      },
    });
  }

  setClubFromScraping(response: ScrapingGetInfoClubResponse) {
    try {
      console.log(response);
      if (response.address.street !== '') {
        this.site.address.street = response.address.street;
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.toastService.showToast(TOAST_STATE.error, 'No ha sido posible scrapear sitio');
    }
  }

  addressToCoordinates() {
    if (this.site.address.street !== '' && this.site.address.poblation !== '') {
      this.geoService
        .addressToCoordinates(
          `${this.site.address.street} ${this.site.address.poblation}`
        )
        .subscribe({
          next: (response) =>
            (this.site.address.coordinates = response.coordinates),
          error: (error) =>
            this.toastService.showToast(TOAST_STATE.error, error),
        });
    } else {
      this.toastService.showToast(TOAST_STATE.error, 'Revisa la direccion');
    }
  }

  coordinatesToAddress() {
    if (this.site.address.coordinates.length === 2) {
      this.geoService
        .coordinatesToAddress(this.site.address.coordinates)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) =>
            this.toastService.showToast(TOAST_STATE.error, error),
        });
    } else {
      this.toastService.showToast(TOAST_STATE.error, 'Revisa las coordenadas');
    }
  }
}
