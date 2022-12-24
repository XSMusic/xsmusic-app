import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { MessageI, ScrapingGetInfoArtistResponse } from '@interfaces';
import { Artist, Image, Style } from '@models';
import {
  ArtistService,
  ScrapingService,
  ImageService,
  ValidationsFormService,
  UIService,
  MODAL_STATE,
  TOAST_STATE,
} from '@services';
import {
  ImageSetFirstImageDto,
  ImageUploadByUrlDto,
} from '@shared/services/api/image/image.dto';
import { ScrapingGetInfoArtistDto } from '@shared/services/api/scraping/scraping.dto';
import { countries } from 'assets/data/countries';

@Component({
  selector: 'admin-artist-one',
  templateUrl: 'admin-artist-one.component.html',
  animations: [inOutAnimation],
})
export class AdminArtistOneComponent {
  @Input() artist: Artist = new Artist();
  @Input() styles: Style[] = [];
  title!: string;
  countries = countries;
  scraping: any = {
    images: [],
    infos: [],
    styles: [],
  };
  image = '';
  imageState = false;
  tempImages: string[] = [];
  @Output() onCreated = new EventEmitter<void>();
  constructor(
    private router: Router,
    private artistService: ArtistService,
    private ui: UIService,
    private scrapingService: ScrapingService,
    private imageService: ImageService,
    private validationsFormService: ValidationsFormService
  ) {}

  onClickStyleScrapingItem(item: { name: string; _id: string }) {
    this.artist.styles?.push(item);
    this.scraping.styles = this.scraping.styles.filter(
      (style: { name: string; _id: string }) => style !== item
    );
  }

  onKeyUpName() {
    this.ui.spinner.show();
    const body: ScrapingGetInfoArtistDto = {
      name: this.artist.name,
      countryCode: this.artist.country,
    };
    this.scrapingService.getInfoArtist(body).subscribe({
      next: (response) => this.setArtistFromScraping(response),
      error: (error) => {
        this.ui.toast.showToast(TOAST_STATE.error, error);
        this.ui.spinner.hide();
      },
    });
  }

  private setArtistFromScraping(response: ScrapingGetInfoArtistResponse) {
    this.artist.country = response.country;
    this.setSocialFromScraping(response);
    if (response.birthdate !== '' && this.artist.birthdate === '') {
      this.artist.birthdate = response.birthdate;
    }
    this.setStylesFromScraping(response);
    this.scraping.images = response.images;
    if (response.info) {
      this.scraping.infos = response.info;
    }
    this.ui.spinner.hide();
  }

  private setStylesFromScraping(response: ScrapingGetInfoArtistResponse) {
    if (response.styles.length > 0 && this.artist.styles!.length === 0) {
      this.artist.styles = response.styles;
    } else if (response.styles.length > 0 && this.artist.styles!.length > 0) {
      this.scraping.styles = response.styles;
      for (const style of this.artist.styles!) {
        this.scraping.styles = this.scraping.styles.filter(
          (item: { name: string; _id: string }) => item._id !== style._id
        );
      }
    }
  }

  private setSocialFromScraping(response: ScrapingGetInfoArtistResponse) {
    if (response.social.web !== '' && this.artist.social.web === '') {
      this.artist.social.web = response.social.web;
    }
    if (response.social.facebook !== '' && this.artist.social.facebook === '') {
      this.artist.social.facebook = response.social.facebook;
    }
    if (response.social.twitter !== '' && this.artist.social.twitter === '') {
      this.artist.social.twitter = response.social.twitter;
    }
    if (
      response.social.soundcloud !== '' &&
      this.artist.social.soundcloud === ''
    ) {
      this.artist.social.soundcloud = response.social.soundcloud;
    }
    if (response.social.spotify !== '' && this.artist.social.spotify === '') {
      this.artist.social.spotify = response.social.spotify;
    }
  }

  showImage(data: { image: Image; remote: boolean }) {
    this.ui.fullImage.show(data.image, data.remote);
  }

  showInfo(info: string) {
    this.ui.modal.showModal(MODAL_STATE.info, 'Informacion', info);
  }

  selectInfo(info: string) {
    this.artist.info = info;
  }

  uploadImageByUrl(image: string) {
    const temp = this.artist._id ? false : true;
    const data: ImageUploadByUrlDto = {
      id: this.artist._id!,
      type: 'artist',
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
            this.artist.images?.push(response);
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
        this.artist.images = this.artist.images?.filter(
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
      type: 'artist',
      typeId: this.artist._id!,
      imageId: img._id!,
    };
    this.imageService.setFirstImage(data).subscribe({
      next: (response) => {
        this.artist.images = response;
        this.ui.toast.showToast(
          TOAST_STATE.info,
          'La imagen ha sido actualizada'
        );
      },
      error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
    });
  }

  onSubmit() {
    const validation = this.validationsFormService.validation(
      'artist',
      this.artist,
      this.tempImages
    );
    if (validation.state) {
      if (this.artist._id) {
        this.artistService.update(this.artist).subscribe({
          next: (response) => this.onSuccessUpdate(response),
          error: (error) =>
            this.ui.toast.showToast(TOAST_STATE.error, error),
        });
      } else {
        this.artistService.create(this.artist).subscribe({
          next: (response) => this.onSuccessCreate(response),
          error: (error) =>
            this.ui.toast.showToast(TOAST_STATE.error, error),
        });
      }
    } else {
      this.ui.toast.showToast(TOAST_STATE.error, validation.message);
    }
  }

  onSuccessUpdate(response: MessageI) {
    this.ui.toast.showToast(TOAST_STATE.success, response.message);
    this.router.navigate([routesConfig.artistsAdmin]);
  }

  async onSuccessCreate(response: Artist) {
    this.artist._id = response._id;
    for (const image of this.tempImages) {
      this.uploadImageByUrl(image);
    }
    setTimeout(() => {
      this.ui.toast.showToast(TOAST_STATE.success, 'Artista creado');
      this.onCreated.emit();
    }, 3000);
  }

  onDelete() {
    const modal = this.ui.modal.showModalConfirm(
      'Eliminar Artista',
      '¿Estas seguro de eliminar el artista?'
    );
    const sub$ = modal.subscribe({
      next: (response) => {
        if (response !== '') {
          if (response === true) {
            this.artistService.deleteOne(this.artist._id!).subscribe({
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
      routesConfig.artist.replace(':slug', this.artist.slug!),
    ]);
  }
}
