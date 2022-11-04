import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Artist } from '@models';
import { ArtistService, ToastService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'artists-last-block',
  templateUrl: 'artists-last-block.component.html',
  animations: [inOutAnimation],
})
export class ArtistsLastBlockComponent implements OnInit {
  @Input() artists?: Artist[] = [];
  slidesPerView = 3;
  constructor(
    private artistService: ArtistService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setSlidesPerView();
    this.getLastArtists();
  }

  setSlidesPerView() {
    if (window.innerWidth <= 360) {
      this.slidesPerView = 2.5;
    } else if (window.innerWidth <= 500) {
      this.slidesPerView = 5;
    } else if (window.innerWidth <= 1440) {
      this.slidesPerView = 12.5;
    } else if (window.innerWidth > 1441) {
      this.slidesPerView = 15.5;
    }
  }

  getLastArtists() {
    this.artistService
      .getAll({
        page: 1,
        pageSize: 20,
        order: ['created', 'desc'],
      })
      .subscribe({
        next: (response) => (this.artists = response.items),
        error: (error) => this.toast.showToast(TOAST_STATE.error, error),
      });
  }

  goToArtistProfile(slug: string) {
    this.router.navigate([routesConfig.artist.replace(':slug', slug)]);
  }
}
