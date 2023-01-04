import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { ScrapingGetInfoArtistResponse, ShowImageI } from '@interfaces';
import { Artist, Image, Style } from '@models';
import {
  ScrapingService,
  UIService,
  MODAL_STATE,
  TOAST_STATE,
} from '@services';
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
  @Input() scraping: any = {
    images: [],
    infos: [],
    styles: [],
  };
  countries = countries;
  image = '';
  imageState = false;
  @Output() onSubmit = new EventEmitter<{ scraping: any }>();
  @Output() showImage = new EventEmitter<ShowImageI>();
  @Output() uploadImageByUrl = new EventEmitter<string>();
  @Output() uploadImageByFile = new EventEmitter<File>();
  @Output() removeImage = new EventEmitter<Image>();
  @Output() setFirstImage = new EventEmitter<Image>();
  @Output() delete = new EventEmitter<Image>();
  constructor(
    private router: Router,
    private ui: UIService,
    private scrapingService: ScrapingService
  ) {}

  onKeyUpName() {
    try {
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
    } catch (error) {
      this.ui.spinner.hide();
    }
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
    if (this.artist.social) {
      if (response.social.web !== '' && this.artist.social.web === '') {
        this.artist.social.web = response.social.web;
      }
      if (
        response.social.facebook !== '' &&
        this.artist.social.facebook === ''
      ) {
        this.artist.social.facebook = response.social.facebook;
      }
      if (response.social.twitter !== '' && this.artist.social.twitter === '') {
        this.artist.social.twitter = response.social.twitter;
      }
      if (
        response.social.soundcloud !== '' &&
        this.artist.social.soundcloud &&
        this.artist.social.soundcloud === ''
      ) {
        this.artist.social.soundcloud = response.social.soundcloud;
      }
      if (response.social.spotify !== '' && this.artist.social.spotify === '') {
        this.artist.social.spotify = response.social.spotify;
      }
    }
  }

  showInfo(info: string) {
    this.ui.modal.showModal(MODAL_STATE.info, 'Informacion', info);
  }

  selectInfo(info: string) {
    this.artist.info = info;
  }

  goToProfile() {
    this.router.navigate([
      routesConfig.artist.replace(':slug', this.artist.slug!),
    ]);
  }
}
