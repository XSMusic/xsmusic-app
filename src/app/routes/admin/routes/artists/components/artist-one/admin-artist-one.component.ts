import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import {
  MessageI,
  ScrapingGetInfoArtistDto,
  ScrapingGetInfoArtistResponse,
} from '@interfaces';
import { Artist, Image, Style } from '@models';
import {
  ArtistService,
  ToastService,
  ScrapingService,
  ModalService,
  ImageService,
} from '@services';
import {
  ImageSetFirstImageDto,
  ImageUploadByUrlDto,
} from '@shared/services/api/image/image.dto';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { MODAL_STATE } from '@shared/services/ui/modal/modal.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { countries } from 'assets/data/countries';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'admin-artist-one',
  templateUrl: 'admin-artist-one.component.html',
  animations: [inOutAnimation],
})
export class ArtistOneComponent {
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
  constructor(
    private router: Router,
    private artistService: ArtistService,
    private toastService: ToastService,
    private scrapingService: ScrapingService,
    private fullImage: FullImageService,
    private modal: ModalService,
    private spinner: NgxSpinnerService,
    private imageService: ImageService
  ) {}

  onChangeStyleSelect(e: any) {
    if (this.artist.styles!.length <= 3) {
      const newStyle = this.styles.find(
        (style) => style._id!.toString() === e.target.value.toString()
      );
      this.artist.styles?.push(newStyle);
    } else {
      this.toastService.showToast(
        TOAST_STATE.warning,
        'No puedes añadir mas de 3 estilos'
      );
    }
  }

  onClickStyleScrapingItem(item: { name: string; _id: string }) {
    this.artist.styles?.push(item);
    this.scraping.styles = this.scraping.styles.filter(
      (style: { name: string; _id: string }) => style !== item
    );
  }

  onClickStyleItem(item: { name: string; _id: string }) {
    this.artist.styles = this.artist.styles?.filter(
      (style) => style.name !== item.name
    );
  }

  onKeyUpName() {
    this.spinner.show();
    const body: ScrapingGetInfoArtistDto = {
      name: this.artist.name,
      countryCode: this.artist.country,
    };
    this.scrapingService.getInfoArtist(body).subscribe({
      next: (response) => this.setArtistFromScraping(response),
      error: (error) => {
        this.toastService.showToast(TOAST_STATE.error, error);
        this.spinner.hide();
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
    this.setImagesFromScraping(response);

    if (response.info) {
      this.scraping.infos = response.info;
    }
    this.spinner.hide();
  }

  private setImagesFromScraping(response: ScrapingGetInfoArtistResponse) {
    this.scraping.images = response.images;
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

  showImage(image: string) {
    this.fullImage.showImageFull(image);
  }

  showInfo(info: string) {
    this.modal.showModal(MODAL_STATE.info, 'Informacion', info);
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
    this.spinner.show();
    this.imageService.uploadByUrl(data).subscribe({
      next: (response) => {
        if (!temp) {
          setTimeout(() => {
            this.artist.images?.push(response);
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
        this.artist.images = this.artist.images?.filter(
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
      type: 'artist',
      typeId: this.artist._id!,
      imageId: img._id!,
    };
    this.imageService.setFirstImage(data).subscribe({
      next: (response) => {
        this.artist.images = response;
        this.toastService.showToast(
          TOAST_STATE.info,
          'La imagen ha sido actualizada'
        );
      },
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  onSubmit() {
    if (this.artist._id) {
      this.artistService.update(this.artist).subscribe({
        next: (response) => this.onSuccessUpdate(response),
        error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
      });
    } else {
      this.artistService.create(this.artist).subscribe({
        next: (response) => this.onSuccessCreate(response),
        error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
      });
    }
  }

  onSuccessUpdate(response: MessageI) {
    this.toastService.showToast(TOAST_STATE.success, response.message);
    this.router.navigate([routesConfig.artistsAdmin]);
  }

  async onSuccessCreate(response: Artist) {
    this.artist._id = response._id;
    for (const image of this.tempImages) {
      this.uploadImageByUrl(image);
    }
    setTimeout(() => {
      this.toastService.showToast(TOAST_STATE.success, 'Artista creado');
      this.router.navigate([routesConfig.artistsAdmin]);
    }, 3000);
  }

  onDelete() {
    // TODO: Añadir confirmacion por modal
    this.artistService.deleteOne(this.artist._id!).subscribe({
      next: (response) => this.onSuccessUpdate(response),
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }
}
