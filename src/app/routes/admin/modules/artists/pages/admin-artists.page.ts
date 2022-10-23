import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetAllDto, SearchDto } from '@interfaces';
import { Artist } from '@models';
import { ArtistService } from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import {
  ToastService,
  TOAST_STATE,
} from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'page-admin-artists',
  templateUrl: 'admin-artists.page.html',
})
export class AdminArtistsPage {
  artists: Artist[] = [];
  body: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['updated', 'desc'],
  };
  loading = true;
  error = false;
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
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  goToProfile(slug: string) {
    this.router.navigate(['artists/profile/', slug]);
  }

  filter(event: { name: string; value: string }) {
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
    if (button.action === 'order' || button.action === 'filter') {
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
