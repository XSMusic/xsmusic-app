import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Artist } from '@models';
import { ToastService } from '@services';
import { ArtistService } from '@shared/services/api/artist/artist.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private spinner: NgxSpinnerService
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
        this.views = [
          { name: 'Sets', value: 'set', counter: response.sets.length },
          { name: 'Tracks', value: 'track', counter: response.tracks.length },
          {
            name: 'Imagenes',
            value: 'image',
            counter:
              response.images!.length === 0
                ? response.images!.length
                : response.images!.length - 1,
          },
        ];
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }
}
