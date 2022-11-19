import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { GetAllDto, MessageI } from '@interfaces';
import { Artist, Image, Media, Site, Style } from '@models';
import {
  ArtistService,
  ImageService,
  MediaService,
  SiteService,
  StyleService,
  ToastService,
} from '@services';
import {
  ImageSetFirstImageDto,
  ImageUploadByUrlDto,
} from '@shared/services/api/image/image.dto';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(
    private artistService: ArtistService,
    private styleService: StyleService,
    private siteService: SiteService,
    private mediaService: MediaService,
    private toast: ToastService,
    private toastService: ToastService,
    private fullImage: FullImageService,
    private router: Router,
    private imageService: ImageService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getAllStytles();
  }

  getAllStytles() {
    this.styleService
      .getAll({
        page: 1,
        pageSize: 100,
        order: ['name', 'asc'],
        complete: false,
      })
      .subscribe({
        next: (response) => (this.styles = response.items),
        error: (error) => this.toast.showToast(TOAST_STATE.error, error),
      });
  }

  onClickItem(type: 'artists' | 'styles', item: { name: string; _id: string }) {
    this.media[type] = this.media[type]?.filter(
      (mediaItem: Media) => mediaItem.name !== item.name
    );
  }

  closeSelection(type: string) {
    if (type === 'artists') {
      this.selectArtistsState = false;
    } else {
      this.selectSitesState = false;
    }
  }

  onChangeInputArtist(e: string) {
    if (this.media.artists!.length < 3) {
      this.bodyArtist.filter = ['name', e];
      this.artistService.getAll(this.bodyArtist).subscribe({
        next: (response) => {
          this.artistsSearch = response.items;
          this.selectArtistsState = true;
        },
        error: (error) => this.toast.showToast(TOAST_STATE.error, error),
      });
    } else {
      this.toast.showToast(TOAST_STATE.warning, '3 artistas maximo');
    }
  }

  onSelectArtist(artist: Artist) {
    if (this.media.artists!.length < 3) {
      this.media.artists?.push(artist);
      this.artistSearch = null;
      this.selectArtistsState = false;
    } else {
      this.toast.showToast(TOAST_STATE.warning, '3 artistas maximo');
      this.selectArtistsState = false;
    }
  }

  onChangeInputSite(e: string) {
    this.bodySite.filter = ['name', e];
    this.siteService.getAll(this.bodySite).subscribe({
      next: (response) => (this.sitesSearch = response.items),
      error: (error) => this.toast.showToast(TOAST_STATE.error, error),
    });
    this.selectSitesState = true;
  }

  onSelectSite(site: Site) {
    this.media.site = site;
    this.siteSearch = null;
    this.selectSitesState = false;
  }

  onChangeStyleSelect(e: any) {
    if (this.media.styles!.length < 5) {
      const netItem = this.styles.find(
        (style) => style._id!.toString() === e.target.value.toString()
      );
      this.media.styles?.push(netItem);
    } else {
      this.toastService.showToast(
        TOAST_STATE.warning,
        'No puedes añadir mas de 5 estilos'
      );
    }
  }

  validationSubmit() {
    if (this.media.name === '') {
      return {
        state: false,
        message: 'El nombre es obligatorio',
      };
    } else if (this.media.source === '') {
      return {
        state: false,
        message: 'El medio es obligatorio',
      };
    } else if (this.media.artists!.length === 0) {
      return {
        state: false,
        message: 'Minimo un artista',
      };
    } else if (this.media.styles!.length === 0) {
      return {
        state: false,
        message: 'Minimo un estilo',
      };
    } else if (this.media.sourceId === '') {
      return {
        state: false,
        message: 'El id del video es obligatorio',
      };
    } else if (!this.media._id && this.tempImages.length === 0) {
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
    const validation = this.validationSubmit();
    if (validation.state) {
      if (this.media._id) {
        this.mediaService.update(this.media).subscribe({
          next: (response) => this.onSuccessUpdate(response),
          error: (error) =>
            this.toastService.showToast(TOAST_STATE.error, error),
        });
      } else {
        this.mediaService.create(this.media).subscribe({
          next: (response) => this.onSuccessCreate(response),
          error: (error) =>
            this.toastService.showToast(TOAST_STATE.error, error),
        });
      }
    } else {
      this.toast.showToast(TOAST_STATE.error, validation.message);
    }
  }

  onSuccessUpdate(response: MessageI) {
    this.toastService.showToast(TOAST_STATE.success, response.message);
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
    this.toastService.showToast(
      TOAST_STATE.success,
      `${this.media.type === 'set' ? 'Set' : 'Track'} creado`
    );
    this.onSubmitSuccess.emit(this.media);
  }

  onDelete() {
    // TODO: Añadir confirmacion por modal
    this.mediaService.deleteOne(this.media._id!).subscribe({
      next: (response) => this.onSuccessUpdate(response),
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  showImage(image: string) {
    this.fullImage.showImageFull(image);
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
    this.spinner.show();
    this.imageService.uploadByUrl(data).subscribe({
      next: (response) => {
        if (!temp) {
          setTimeout(() => {
            this.media.images?.push(response);
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
        this.media.images = this.media.images?.filter(
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
      type: 'media',
      typeId: this.media._id!,
      imageId: img._id!,
    };
    this.imageService.setFirstImage(data).subscribe({
      next: (response) => {
        this.media.images = response;
        this.toastService.showToast(
          TOAST_STATE.info,
          'La imagen ha sido actualizada'
        );
      },
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  goToYoutube() {
    window.open(
      `https://www.youtube.com/watch?v=${this.media.sourceId!}`,
      '_blank'
    );
  }
}
