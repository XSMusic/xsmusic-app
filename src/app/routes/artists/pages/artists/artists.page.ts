import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { GetAllDto, SearchDto } from '@interfaces';
import { Artist } from '@models';
import { ToastService } from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { ArtistService } from '@shared/services/api/artist/artist.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'artists',
  templateUrl: 'artists.page.html',
  animations: [inOutAnimation],
})
export class ArtistsPage implements OnInit {
  artists: Artist[] = [];
  view = 'gallery';
  body: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['created', 'desc'],
  };
  loading = true;
  error = false;
  buttons = [];
  constructor(
    private router: Router,
    private artistService: ArtistService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getArtists();
  }

  getArtists(more = false) {
    this.artistService.getAll(this.body).subscribe({
      next: (response) => {
        if (!more) {
          this.artists = response.items;
        } else {
          this.artists = this.artists.concat(response.items);
        }
        this.loading = false;
        this.error = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = true;
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  goToProfile(artist: Artist) {
    this.router.navigate(['artists/profile/', artist.slug]);
  }

  filter(event: { name: string; value: string }) {
    console.log(event);
    this.body.filter = [event.name, event.value];
    this.getArtists();
  }

  removeFilter() {
    this.body.filter = [];
    this.getArtists();
  }

  onScroll() {
    this.body.page++;
    this.getArtists(true);
  }

  onClickButton(button: ButtonBlockItem) {
    if (button.action === 'viewGallery' || button.action === 'viewList') {
      this.view = button.action;
    } else {
      this.toast.showToast(TOAST_STATE.info, 'En construccion');
    }
  }

  onSearch(event: { text: string; type: string }) {
    if (event.text === '') {
      this.body.page = 1;
      this.getArtists();
    } else {
      const body: SearchDto = { value: event.text, limit: 20 };
      this.artistService.search(body).subscribe({
        next: (response) => {
          this.artists = response;
        },
        error: (error) => this.toast.showToast(TOAST_STATE.error, error),
      });
    }
  }
}
