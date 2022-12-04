import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Artist } from '@models';
import { MetaService, ToastService, TOAST_STATE } from '@services';
import { ArtistService } from '@shared/services/api/artist/artist.service';
import { MetadataI } from '@shared/services/system/meta';
import { NgxSpinnerService } from '@shared/services/system/ngx-spinner/ngx-spinner.service';
import { environment } from '@env/environment';
import { routesConfig } from '@core/config';

@Component({
  selector: 'page-artist',
  templateUrl: 'artist.page.html',
  animations: [inOutAnimation],
})
export class ArtistPage implements OnInit {
  artist!: Artist;
  artists: Artist[] = [];
  slug!: string;
  views: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.getArtist();
  }

  getArtist() {
    this.artistService.getOne('slug', this.slug).subscribe({
      next: (response) => {
        this.artist = response;
        this.setMeta();
        this.setViews();
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  setMeta() {
    const meta: MetadataI = {
      title: this.artist.name,
      image: `${environment.urls.images}/${this.artist.images![0].url}`,
      url: `${environment.urls.app}${routesConfig.artist.replace(
        ':slug',
        this.artist.slug!
      )}`,
    };
    if (this.artist.info !== '') {
      meta.description = this.artist.info;
    }
    this.metaService.setMetaDynamic(meta);
  }

  setViews() {
    if (this.artist.sets && this.artist.sets.length > 0) {
      this.views.push({
        name: 'Sets',
        value: 'set',
        counter: this.artist.sets.length,
      });
    }
    if (this.artist.tracks && this.artist.tracks.length > 0) {
      this.views.push({
        name: 'Tracks',
        value: 'track',
        counter: this.artist.tracks.length,
      });
    }
    if (this.artist.events && this.artist.events.length > 0) {
      this.views.push({
        name: 'Eventos',
        value: 'event',
        counter: this.artist.events ? this.artist.events.length : 0,
      });
    }
    if (this.artist.images && this.artist.images.length > 1) {
      this.views.push({
        name: 'Imagenes',
        value: 'image',
        counter:
          this.artist.images.length === 0
            ? this.artist.images.length
            : this.artist.images.length - 1,
      });
    }
  }
}
