import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { GetAllDto, MessageI } from '@interfaces';
import { Artist, Image, Media, Site, Style } from '@models';
import {
  ImageService,
  MediaService,
  TOAST_STATE,
  UIService,
  ValidationsFormService,
} from '@services';
import {
  ImageSetFirstImageDto,
  ImageUploadByUrlDto,
} from '@shared/services/api/image/image.dto';

@Component({
  selector: 'admin-media-one',
  templateUrl: 'admin-media-one.component.html',
  animations: [inOutAnimation],
})
export class AdminMediaOneComponent {
  @Input() media: Media = new Media();
  @Input() scraping: any = {
    images: [],
    infos: [],
    styles: [],
  };
  @Output() onSubmitSuccess = new EventEmitter<Media>();
  sources = [{ name: 'Youtube', value: 'youtube' }];
  bodyArtist: GetAllDto = {
    page: 1,
    pageSize: 5,
    order: ['name', 'asc'],
    filter: [],
  };
  bodySite: GetAllDto = {
    page: 1,
    pageSize: 5,
    order: ['name', 'asc'],
    filter: [],
    type: 'all',
  };
  artistsSearch: Artist[] = [];
  sitesSearch: Site[] = [];
  styles: Style[] = [];
  selectArtistsState = false;
  selectSitesState = false;
  artistSearch = null;
  siteSearch = null;
  image = '';
  imageState = false;
  tempImages: string[] = [];
  defaultSite = '6367d34e5ba8b44fdf9476c2';

  constructor(
    private mediaService: MediaService,
    private router: Router,
    private imageService: ImageService,
    private ui: UIService,
    private validationsFormService: ValidationsFormService
  ) {}

  ngOnInit() {
    this.setDefaultSite();
  }

  setDefaultSite() {
    this.media.site = { name: 'Desconocido', _id: this.defaultSite };
  }

  onSubmit() {
    const validation = this.validationsFormService.validation(
      'media',
      this.media,
      this.tempImages
    );
    if (validation.state) {
      if (this.media._id) {
        this.mediaService.update(this.media).subscribe({
          next: (response) => this.onSuccessUpdate(response),
          error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
        });
      } else {
        this.mediaService.create(this.media).subscribe({
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
    this.router.navigate([
      this.media.type === 'set'
        ? routesConfig.setsAdmin
        : routesConfig.tracksAdmin,
    ]);
  }

  async onSuccessCreate(response: Media) {
    this.media._id = response._id;
    for (const image of this.tempImages) {
      this.uploadImageByUrl(image);
    }
    this.ui.toast.showToast(
      TOAST_STATE.success,
      `${this.media.type === 'set' ? 'Set' : 'Track'} creado`
    );
    this.onSubmitSuccess.emit(this.media);
  }

  onDelete() {
    const itemType = `${this.media.type === 'set' ? 'Set' : 'Track'}`;
    const modal = this.ui.modal.showModalConfirm(
      `Eliminar ${itemType}`,
      `¿Estas seguro de eliminar el ${itemType}?`
    );
    const sub$ = modal.subscribe({
      next: (response) => {
        if (response !== '') {
          if (response === true) {
            this.mediaService.deleteOne(this.media._id!).subscribe({
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

  showImage(data: { image: Image; remote: boolean }) {
    this.ui.fullImage.show(data.image, data.remote);
  }

  goToMedia(slug: string) {
    if (this.media.type === 'set') {
      this.router.navigate([routesConfig.set.replace(':slug', slug)]);
    } else {
      this.router.navigate([routesConfig.track.replace(':slug', slug)]);
    }
  }

  uploadImageByUrl(image: string) {
    const temp = this.media._id ? false : true;
    const data: ImageUploadByUrlDto = {
      id: this.media._id!,
      type: 'media',
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
    this.ui.spinner.show();
    this.imageService.uploadByUrl(data).subscribe({
      next: (response) => {
        if (!temp) {
          setTimeout(() => {
            this.media.images?.push(response);
            this.image = '';
            this.ui.spinner.hide();
          }, 1000);
        }
      },
      error: (error) => {
        this.ui.spinner.hide();
        this.ui.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  removeImage(img: Image) {
    this.imageService.deleteOne(img._id!).subscribe({
      next: () => {
        this.media.images = this.media.images?.filter(
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
      type: 'media',
      typeId: this.media._id!,
      imageId: img._id!,
    };
    this.imageService.setFirstImage(data).subscribe({
      next: (response) => {
        this.media.images = response;
        this.ui.toast.showToast(
          TOAST_STATE.info,
          'La imagen ha sido actualizada'
        );
      },
      error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
    });
  }

  goToYoutube() {
    window.open(
      `https://www.youtube.com/watch?v=${this.media.sourceId!}`,
      '_blank'
    );
  }
}
