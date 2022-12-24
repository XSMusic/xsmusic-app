import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { MessageI } from '@interfaces';
import { Event, Image, Style } from '@models';
import {
  ImageService,
  EventService,
  ValidationsFormService,
  UIService,
  TOAST_STATE,
  ApiService,
} from '@services';
import {
  ImageSetFirstImageDto,
  ImageUploadByUrlDto,
  ImageUploadDto,
} from '@shared/services/api/image/image.dto';

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
  tempImagesByUrl: string[] = [];
  tempImagesByFile: File[] = [];
  constructor(
    private eventService: EventService,
    private apiService: ApiService,
    private ui: UIService,
    private router: Router,
    private imageService: ImageService,
    private validationsFormService: ValidationsFormService
  ) {}

  showImage(data: { image: Image; remote: boolean }) {
    this.ui.fullImage.show(data.image, data.remote);
  }

  uploadImageByFile(image: File) {
    const temp = this.event._id ? false : true;
    const data: ImageUploadDto = {
      type: 'event',
      id: this.event._id!,
    };
    if (!temp) {
      this.uploadImageByFileNormal(data, image);
    } else {
      this.uploadImageByFileTemp(image);
    }
  }

  private uploadImageByFileNormal(data: ImageUploadDto, image: File) {
    this.ui.spinner.show();
    this.imageService.upload(data, image).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.event.images?.push(response);
          this.ui.spinner.hide();
        }, 1000);
      },
      error: (error) => {
        this.ui.spinner.hide();
        this.ui.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  private uploadImageByFileTemp(image: File) {
    this.tempImagesByFile.push(image);
  }

  uploadImageByUrl(image: string) {
    const temp = this.event._id ? false : true;
    const data: ImageUploadByUrlDto = {
      id: this.event._id!,
      type: 'event',
      url: image,
    };
    if (!temp) {
      this.uploadImageByUrlNormal(data);
    } else {
      this.uploadImageByUrlTemp(image);
    }
  }

  private uploadImageByUrlNormal(data: ImageUploadByUrlDto) {
    this.ui.spinner.show();
    this.imageService.uploadByUrl(data).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.event.images?.push(response);
          this.image = '';
          this.ui.spinner.hide();
        }, 1000);
      },
      error: (error) => {
        this.ui.spinner.hide();
        this.ui.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  private uploadImageByUrlTemp(image: string) {
    this.tempImagesByUrl.push(image);
    if (this.scraping.images && this.scraping.images.length > 0) {
      this.scraping.images = this.scraping.images.filter(
        (img: string) => img !== image
      );
    }
  }

  removeImage(img: Image) {
    this.apiService.deleteOne('images', img._id!).subscribe({
      next: () => {
        this.event.images = this.event.images?.filter(
          (item) => item._id !== img._id
        );
        this.ui.toast.showToast(
          TOAST_STATE.info,
          'La imagen ha sido eliminada'
        );
      },
      error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
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
        this.ui.toast.showToast(
          TOAST_STATE.info,
          'La imagen ha sido actualizada'
        );
      },
      error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
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
    } else if (!this.event._id && this.tempImagesByUrl.length === 0) {
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
    const validation = this.validationsFormService.validation(
      'event',
      this.event,
      this.tempImagesByUrl
    );
    if (validation.state) {
      if (this.event._id) {
        this.eventService.update(this.event).subscribe({
          next: (response) => this.onSuccessUpdate(response),
          error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
        });
      } else {
        this.eventService.create(this.event).subscribe({
          next: (response) => this.onSuccessCreate(response),
          error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
        });
      }
    } else {
      this.ui.toast.showToast(TOAST_STATE.error, validation.message);
    }
  }

  onSuccessUpdate(response: MessageI) {
    this.ui.toast.showToast(TOAST_STATE.success, response.message);
    this.router.navigate([routesConfig.eventsAdmin]);
  }

  async onSuccessCreate(response: Event) {
    this.event._id = response._id;
    for (const imageUrl of this.tempImagesByUrl) {
      this.uploadImageByUrl(imageUrl);
    }
    for (const imageFile of this.tempImagesByFile) {
      this.uploadImageByFile(imageFile);
    }
    setTimeout(() => {
      this.ui.toast.showToast(TOAST_STATE.success, 'Sitio creado');
      this.router.navigate([routesConfig.eventsAdmin]);
    }, 3000);
  }

  onDelete() {
    const modal = this.ui.modal.showModalConfirm(
      `Eliminar evento`,
      `¿Estas seguro de eliminar el evento?`
    );
    const sub$ = modal.subscribe({
      next: (response) => {
        if (response !== '') {
          if (response === true) {
            this.apiService.deleteOne('events', this.event._id!).subscribe({
              next: (response) => this.onSuccessUpdate(response),
              error: (error) =>
                this.ui.toast.showToast(TOAST_STATE.error, error),
            });
          }
          sub$.unsubscribe();
        }
      },
    });
  }

  goToProfile() {
    this.router.navigate([
      routesConfig.event.replace(':slug', this.event.slug!),
    ]);
  }
}
