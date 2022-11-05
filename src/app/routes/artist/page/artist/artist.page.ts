import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Artist, Media } from '@models';
import { ToastService } from '@services';
import { ArtistService } from '@shared/services/api/artist/artist.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'artist',
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
    private router: Router,
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
    this.artistService.getOne({ slug: this.slug })!.subscribe({
      next: (artist: any) => {
        this.artist = artist;
        this.views = [
          { name: 'Sets', value: 'set', counter: artist.sets.length },
          { name: 'Tracks', value: 'track', counter: artist.tracks.length },
        ];
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  goToSet(set: Media) {
    this.router.navigate(['sets', set._id]);
  }
}
