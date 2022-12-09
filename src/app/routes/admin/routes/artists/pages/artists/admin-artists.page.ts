import { Component } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { GetAllDto } from '@interfaces';
import { Artist } from '@models';
import {
  ArtistService,
  NavigationService,
  StatsService,
  ToastService,
  TOAST_STATE,
} from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { StatsGetTopStatsI } from '@shared/services/api/stats/stats.interface';

@Component({
  selector: 'page-admin-artists',
  templateUrl: 'admin-artists.page.html',
  animations: [inOutAnimation],
})
export class AdminArtistsPage {
  items: Artist[] = [];
  artist: Artist = new Artist();
  stats: StatsGetTopStatsI = {
    topSocial: [],
    topCountries: [],
  };
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
    private statsService: StatsService,
    private toast: ToastService,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.getArtists();
    this.getStats();
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

  getStats() {
    this.statsService.getTopStats({ type: 'artist', limit: 10 }).subscribe({
      next: (response) => {
        this.stats = response;
      },
      error: (error) => this.toast.showToast(TOAST_STATE.error, error),
    });
  }

  goToPage(data: GoToPageI) {
    if (data.admin === undefined) {
      data.admin = true;
    }
    this.navigationService.goToPage(data);
  }

  onFilter(event: { name: string; value: string }) {
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

  onCreatedArtist() {
    this.getArtists();
    this.artist = new Artist();
    this.view = 'viewList';
  }
}
