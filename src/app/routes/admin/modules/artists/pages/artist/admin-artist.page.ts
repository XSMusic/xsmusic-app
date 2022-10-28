import { Component } from '@angular/core';
import { Artist, Style } from '@models';
import { ArtistService, ScrapingService, ToastService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MessageI,
  ScrapingGetInfoArtistDto,
  ScrapingGetInfoArtistResponse,
} from '@interfaces';
import { StyleService } from '@shared/services/api/style/style.service';
import { countries } from 'assets/data/countries';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';

@Component({
  selector: 'page-admin-artist',
  templateUrl: 'admin-artist.page.html',
})
export class AdminArtistPage {
  id!: string;
  artist = new Artist();
  styles: Style[] = [];
  title!: string;
  countries = countries;
  scraping: any = {
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/David_Guetta_live_%40_MTV_EMA_2018.png/220px-David_Guetta_live_%40_MTV_EMA_2018.png',
      'https://clubbingspain.com/imagenes/David-Guetta-2016-600.jpg',
    ],
    infos: [
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda, iure. Cupiditate, ducimus incidunt! Non labore, fuga quidem voluptatum quis nam fugit laudantium tempore, laborum, consequatur nemo officia! Corporis, laboriosam aperiam!',
      'tururu yeah oh si Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda, iure. Cupiditate, ducimus incidunt! Non labore, fuga quidem voluptatum quis nam fugit laudantium tempore, laborum, consequatur nemo officia! Corporis, laboriosam aperiam!',
    ],
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artistService: ArtistService,
    private toastService: ToastService,
    private styleService: StyleService,
    private scrapingService: ScrapingService,
    private fullImage: FullImageService
  ) {}

  ngOnInit() {
    this.getStyles();
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.getOne();
      this.title = 'Editar Artista';
    } else {
      this.title = 'Nuevo Artista';
    }
  }

  getStyles() {
    this.styleService
      .getAll({ page: 1, pageSize: 100, order: ['name', 'asc'] })
      .subscribe({
        next: (response) => (this.styles = response.items),
        error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
      });
  }

  getOne() {
    this.artistService.getOne({ id: this.id }).subscribe({
      next: (response) => {
        this.artist = response;
      },
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  onSubmit() {
    const observable = this.id
      ? this.artistService.update(this.artist)
      : this.artistService.create(this.artist);
    observable.subscribe({
      next: (response) => this.onSuccess(response),
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  onDelete() {
    // TODO: Añadir confirmacion por modal
    this.artistService.deleteOne(this.id).subscribe({
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
    console.log(event);
    const body: ScrapingGetInfoArtistDto = {
      name: event.target.value,
      countryCode: this.artist.country,
    };
    this.scrapingService.getInfoArtist(body).subscribe({
      next: (response) => this.setArtistFromScraping(response),
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
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
  }

  showImage(image: string) {
    this.fullImage.showImageFull(image);
  }

  selectImage(image: string) {
    this.artist.image = image;
  }

  selectInfo(info: string) {
    this.artist.info = info;
  }
}
