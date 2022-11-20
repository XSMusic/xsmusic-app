import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { MessageI, ScrapingGetInfoClubResponse } from '@interfaces';
import { Image, Site, Style } from '@models';
import {
  ToastService,
  SiteService,
  ScrapingService,
  GeoService,
  ImageService,
  StyleService,
} from '@services';
import {
  ImageSetFirstImageDto,
  ImageUploadByUrlDto,
} from '@shared/services/api/image/image.dto';
import { ScrapingGetInfoClubDto } from '@shared/services/api/scraping/scraping.dto';
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
  styles: Style[] = [];
  countries = countries;
  scraping: any = {
    images: [],
    infos: [],
    styles: [],
  };
  types = [
    { name: 'Club', value: 'club' },
    { name: 'Festival', value: 'festival' },
  ];
  image = '';
  imageState = false;
  tempImages: string[] = [];
  constructor(
    private siteService: SiteService,
    private fullImage: FullImageService,
    private toastService: ToastService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private scrapingService: ScrapingService,
    private geoService: GeoService,
    private imageService: ImageService,
    private styleService: StyleService
  ) {}

  showImage(image: string) {
    this.fullImage.showImageFull(image);
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

  async setClubFromScraping(response: ScrapingGetInfoClubResponse) {
    try {
      if (response.address.street !== '') {
        this.site.address.street = response.address.street;
      }
      if (response.address.town !== '') {
        this.site.address.town = response.address.town;
      }
      if (response.address.state !== '') {
        this.site.address.state = response.address.state;
      }
      if (response.address.country !== '') {
        this.site.address.country = response.address.country;
      }
      if (response.address.coordinates.length > 0) {
        this.site.address.coordinates = response.address.coordinates;
      }
      this.scraping.images = response.images;
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.toastService.showToast(
        TOAST_STATE.error,
        'No ha sido posible scrapear sitio'
      );
    }
  }

  addressToCoordinates() {
    if (this.site.address.street !== '' && this.site.address.poblation !== '') {
      this.geoService
        .addressToCoordinates(
          `${this.site.address.street} ${this.site.address.poblation}`
        )
        .subscribe({
          next: (response) => {
            this.site.address.coordinates = response.coordinates;
            this.toastService.showToast(
              TOAST_STATE.success,
              'Coordenadas actualizadas'
            );
          },
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
          next: () =>
            this.toastService.showToast(
              TOAST_STATE.success,
              'Direccion actualizada'
            ),
          error: (error) =>
            this.toastService.showToast(TOAST_STATE.error, error),
        });
    } else {
      this.toastService.showToast(TOAST_STATE.error, 'Revisa las coordenadas');
    }
  }

  uploadImageByUrl(image: string) {
    const temp = this.site._id ? false : true;
    const data: ImageUploadByUrlDto = {
      id: this.site._id!,
      type: 'site',
      url: image,
    };
    if (!temp) {
      this.uploadImageByUrlNormal(data, temp);
    } else {
      this.uploadImageByUrlTemp(image);
    }
  }

  private uploadImageByUrlTemp(image: string) {
    this.tempImages.push(image);
    if (this.scraping.images && this.scraping.images.length > 0) {
      this.scraping.images = this.scraping.images.filter(
        (img: string) => img !== image
      );
    }
  }

  private uploadImageByUrlNormal(data: ImageUploadByUrlDto, temp: boolean) {
    this.spinner.show();
    this.imageService.uploadByUrl(data).subscribe({
      next: (response) => {
        if (!temp) {
          setTimeout(() => {
            this.site.images?.push(response);
            this.image = '';
            this.spinner.hide();
          }, 1000);
        }
      },
      error: (error) => {
        this.spinner.hide();
        this.toastService.showToast(TOAST_STATE.error, error);
      },
    });
  }

  removeImage(img: Image) {
    this.imageService.deleteOne(img._id!).subscribe({
      next: () => {
        this.site.images = this.site.images?.filter(
          (item) => item._id !== img._id
        );
        this.toastService.showToast(
          TOAST_STATE.info,
          'La imagen ha sido eliminada'
        );
      },
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  setFirstImage(img: Image) {
    const data: ImageSetFirstImageDto = {
      type: 'site',
      typeId: this.site._id!,
      imageId: img._id!,
    };
    this.imageService.setFirstImage(data).subscribe({
      next: (response) => {
        this.site.images = response;
        this.toastService.showToast(
          TOAST_STATE.info,
          'La imagen ha sido actualizada'
        );
      },
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  validationSubmit() {
    if (this.site.name === '') {
      return {
        state: false,
        message: 'El nombre es obligatorio',
      };
    } else if (this.site.address.street === '') {
      return {
        state: false,
        message: 'La calle es obligatorio',
      };
    } else if (this.site.styles!.length === 0) {
      return {
        state: false,
        message: 'Minimo un estilo',
      };
    } else if (!this.site._id && this.tempImages.length === 0) {
      return {
        state: false,
        message: 'La imagen es obligatoria',
      };
    } else {
      return {
        state: true,
        message: '',
      };
    }
  }

  onSubmit() {
    if (this.site._id) {
      this.siteService.update(this.site).subscribe({
        next: (response) => this.onSuccessUpdate(response),
        error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
      });
    } else {
      this.siteService.create(this.site).subscribe({
        next: (response) => this.onSuccessCreate(response),
        error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
      });
    }
  }

  onSuccessUpdate(response: MessageI) {
    this.toastService.showToast(TOAST_STATE.success, response.message);
    this.router.navigate([
      this.site.type === 'club'
        ? routesConfig.clubsAdmin
        : routesConfig.festivalsAdmin,
    ]);
  }

  async onSuccessCreate(response: Site) {
    this.site._id = response._id;
    for (const image of this.tempImages) {
      this.uploadImageByUrl(image);
    }
    setTimeout(() => {
      this.toastService.showToast(TOAST_STATE.success, 'Sitio creado');
      this.router.navigate([
        this.site.type === 'club'
          ? routesConfig.clubsAdmin
          : routesConfig.festivalsAdmin,
      ]);
    }, 3000);
  }

  onDelete() {
    // TODO: Añadir confirmacion por modal
    this.siteService.deleteOne(this.site._id!).subscribe({
      next: (response) => this.onSuccessUpdate(response),
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  goToSite(slug: string) {
    if (this.site.type === 'club') {
      this.router.navigate([routesConfig.club.replace(':slug', slug)]);
    } else {
      this.router.navigate([routesConfig.festival.replace(':slug', slug)]);
    }
  }
}
