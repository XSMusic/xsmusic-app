import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { GetAllDto } from '@interfaces';
import { Artist } from '@models';
import { ArtistService, ToastService, TOAST_STATE } from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';

@Component({
  selector: 'page-admin-artists',
  templateUrl: 'admin-artists.page.html',
  animations: [inOutAnimation],
})
export class AdminArtistsPage {
  items: Artist[] = [];
  artist: Artist = new Artist();
  body: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['updated', 'desc'],
  };
  view = 'viewList';
  loading = true;
  error = false;
  total = 0;
  constructor(
    private artistService: ArtistService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getArtists();
  }

  getArtists(more = false) {
    this.artistService.getAll(this.body).subscribe({
      next: (response) => {
        if (!more) {
          this.items = response.items;
          this.total = response.paginator.total;
        } else {
          this.items = this.items.concat(response.items);
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

  goToProfile(item: Artist) {
    this.router.navigate([routesConfig.artistAdmin.replace(':id', item._id!)]);
  }

  filter(event: { name: string; value: string }) {
    this.body.page = 1;
    this.body.filter = [event.name, event.value];
    this.getArtists();
  }

  removeFilter() {
    this.body.page = 1;
    this.body.filter = [];
    this.getArtists();
  }

  onScroll() {
    this.body.page++;
    this.getArtists(true);
  }

  onClickButton(button: ButtonBlockItem) {
    if (button.action.includes('view')) {
      this.view = button.action;
    } else if (button.action === 'order') {
      this.toast.showToast(TOAST_STATE.info, 'En construccion');
    }
  }

  onSearch(event: { text: string; type: string }) {
    if (event.text === '') {
      this.body.page = 1;
      this.getArtists();
    } else {
      this.body.page = 1;
      this.body.filter = ['name', event.text];
      this.getArtists();
    }
  }
}
