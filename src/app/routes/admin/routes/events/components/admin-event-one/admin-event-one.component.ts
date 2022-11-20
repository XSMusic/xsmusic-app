import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { MessageI, ScrapingGetInfoClubResponse } from '@interfaces';
import { Event, Image, Site, Style } from '@models';
import {
  ToastService,
  SiteService,
  ScrapingService,
  GeoService,
  ImageService,
  StyleService,
  EventService,
} from '@services';
import {
  ImageSetFirstImageDto,
  ImageUploadByUrlDto,
} from '@shared/services/api/image/image.dto';
import { ScrapingGetInfoClubDto } from '@shared/services/api/scraping/scraping.dto';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'admin-event-one',
  templateUrl: 'admin-event-one.component.html',
  animations: [inOutAnimation],
})
export class AdminEventOneComponent {
  @Input() event = new Event();
  styles: Style[] = [];
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
    private eventService: EventService,
    private fullImage: FullImageService,
    private toastService: ToastService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private imageService: ImageService
  ) {}

  showImage(image: string) {
    this.fullImage.showImageFull(image);
  }

  uploadImageByUrl(image: string) {
    const temp = this.event._id ? false : true;
    const data: ImageUploadByUrlDto = {
      id: this.event._id!,
      type: 'event',
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
            this.event.images?.push(response);
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
        this.event.images = this.event.images?.filter(
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
      typeId: this.event._id!,
      imageId: img._id!,
    };
    this.imageService.setFirstImage(data).subscribe({
      next: (response) => {
        this.event.images = response;
        this.toastService.showToast(
          TOAST_STATE.info,
          'La imagen ha sido actualizada'
        );
      },
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  validationSubmit() {
    if (this.event.name === '') {
      return {
        state: false,
        message: 'El nombre es obligatorio',
      };
    } else if (this.event.styles!.length === 0) {
      return {
        state: false,
        message: 'Minimo un estilo',
      };
    } else if (!this.event._id && this.tempImages.length === 0) {
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
    if (this.event._id) {
      this.eventService.update(this.event).subscribe({
        next: (response) => this.onSuccessUpdate(response),
        error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
      });
    } else {
      this.eventService.create(this.event).subscribe({
        next: (response) => this.onSuccessCreate(response),
        error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
      });
    }
  }

  onSuccessUpdate(response: MessageI) {
    this.toastService.showToast(TOAST_STATE.success, response.message);
    this.router.navigate([routesConfig.eventsAdmin]);
  }

  async onSuccessCreate(response: Event) {
    this.event._id = response._id;
    for (const image of this.tempImages) {
      this.uploadImageByUrl(image);
    }
    setTimeout(() => {
      this.toastService.showToast(TOAST_STATE.success, 'Sitio creado');
      this.router.navigate([routesConfig.eventsAdmin]);
    }, 3000);
  }

  onDelete() {
    // TODO: Añadir confirmacion por modal
    this.eventService.deleteOne(this.event._id!).subscribe({
      next: (response) => this.onSuccessUpdate(response),
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  goToProfile() {
    this.router.navigate([
      routesConfig.event.replace(':slug', this.event.slug!),
    ]);
  }
}
