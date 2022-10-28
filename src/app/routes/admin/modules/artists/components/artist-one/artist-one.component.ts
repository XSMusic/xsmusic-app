import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  MessageI,
  ScrapingGetInfoArtistDto,
  ScrapingGetInfoArtistResponse,
} from '@interfaces';
import { Artist, Style } from '@models';
import {
  ArtistService,
  ToastService,
  ScrapingService,
  ModalService,
} from '@services';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { MODAL_STATE } from '@shared/services/ui/modal/modal.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { countries } from 'assets/data/countries';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'artist-one',
  templateUrl: 'artist-one.component.html',
})
export class ArtistOneComponent {
  @Input() artist: Artist = new Artist();
  @Input() styles: Style[] = [];
  title!: string;
  countries = countries;
  scraping: any = {
    images: [],
    infos: [],
  };
  constructor(
    private router: Router,
    private artistService: ArtistService,
    private toastService: ToastService,
    private scrapingService: ScrapingService,
    private fullImage: FullImageService,
    private modal: ModalService,
    private spinner: NgxSpinnerService
  ) {}

  onSubmit() {
    const observable = this.artist._id
      ? this.artistService.update(this.artist)
      : this.artistService.create(this.artist);
    observable.subscribe({
      next: (response) => this.onSuccess(response),
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  onDelete() {
    // TODO: Añadir confirmacion por modal
    this.artistService.deleteOne(this.artist._id!).subscribe({
      next: (response) => this.onSuccess(response),
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  onSuccess(response: MessageI) {
    this.toastService.showToast(TOAST_STATE.success, response.message);
    this.router.navigate(['admin/artists']);
  }

  onChangeStyleSelect(e: any) {
    if (this.artist.styles!.length < 5) {
      const newStyle = this.styles.find(
        (style) => style._id!.toString() === e.target.value.toString()
      );
      console.log(newStyle);
      this.artist.styles?.push(newStyle);
    } else {
      this.toastService.showToast(
        TOAST_STATE.warning,
        'No puedes añadir mas de 5 estilos'
      );
    }
  }

  onClickStyleItem(item: { name: string; _id: string }) {
    console.log(item);
    this.artist.styles = this.artist.styles?.filter(
      (style) => style.name !== item.name
    );
  }

  onKeyUpName(event: any) {
    this.spinner.show();
    const body: ScrapingGetInfoArtistDto = {
      name: event.target.value,
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

  setArtistFromScraping(response: ScrapingGetInfoArtistResponse) {
    if (response.social.web !== '' && this.artist.social.web === '') {
      this.artist.social.web = response.social.web;
    }
    if (response.birthdate !== '' && this.artist.birthdate === '') {
      this.artist.birthdate = response.birthdate;
    }
    if (response.image) {
      this.scraping.images = response.image;
    }
    if (response.info) {
      this.scraping.infos = response.info;
    }
    this.spinner.hide();
  }

  showImage(image: string) {
    this.fullImage.showImageFull(image);
  }

  selectImage(image: string) {
    this.artist.image = image;
  }

  showInfo(info: string) {
    this.modal.showModal(MODAL_STATE.info, 'Informacion', info);
  }

  selectInfo(info: string) {
    this.artist.info = info;
  }
}
