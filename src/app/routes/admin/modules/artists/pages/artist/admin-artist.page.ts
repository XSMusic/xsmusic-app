import { Component } from '@angular/core';
import { Artist, Style } from '@models';
import { ArtistService, ToastService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { ActivatedRoute } from '@angular/router';
import { StyleService } from '@shared/services/api/style/style.service';
import { countries } from 'assets/data/countries';
import { NgxSpinnerService } from 'ngx-spinner';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';

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
    images: [],
    infos: [],
  };
  view = 'viewInfo';

  constructor(
    private artistService: ArtistService,
    private styleService: StyleService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getStyles();
    if (this.id) {
      this.title = 'Editar Artista';
      this.getOne();
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
    this.spinner.show();
    this.artistService.getOne({ id: this.id }).subscribe({
      next: (response) => {
        this.artist = response;
        if (!this.artist.social) {
          this.artist.social = {
            web: '',
            facebook: '',
            twitter: '',
            soundcloud: '',
            spotify: '',
          };
        }
        this.spinner.hide();
      },
      error: (error) => {
        this.toastService.showToast(TOAST_STATE.error, error);
        this.spinner.hide();
      },
    });
  }

  onClickButton(event: ButtonBlockItem) {
    this.view = event.action;
  }
}
