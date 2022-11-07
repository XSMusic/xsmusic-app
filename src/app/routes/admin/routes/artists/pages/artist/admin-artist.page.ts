import { Component } from '@angular/core';
import { Artist, Media, Style } from '@models';
import { ArtistService, ToastService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StyleService } from '@shared/services/api/style/style.service';
import { countries } from 'assets/data/countries';
import { NgxSpinnerService } from 'ngx-spinner';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { routesConfig } from '@core/config';

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
    private toastService: ToastService,
    private router: Router
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
            tiktok: '',
            instagram: '',
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

  goToProfile(data: { type: 'media' | 'site'; media: Media }) {
    if (data.type === 'media') {
      if (data.media.type === 'set') {
        this.router.navigate([
          routesConfig.setAdmin.replace(':id', data.media._id!),
        ]);
      } else {
        this.router.navigate([
          routesConfig.trackAdmin.replace(':id', data.media._id!),
        ]);
      }
    } else {
      if (data.media.site.type === 'club') {
        this.router.navigate([
          routesConfig.clubAdmin.replace(':id', data.media.site._id!),
        ]);
      } else if (data.media.site.type === 'festival') {
        this.router.navigate([
          routesConfig.festivalAdmin.replace(':id', data.media.site._id!),
        ]);
      }
    }
  }
}
