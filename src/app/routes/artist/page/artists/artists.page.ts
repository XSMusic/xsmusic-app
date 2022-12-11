import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { FilterListI, GetAllDto } from '@interfaces';
import { Artist } from '@models';
import { NavigationService, ToastService } from '@services';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { ArtistService } from '@shared/services/api/artist/artist.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { getFilterList } from '@shared/utils';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'artists',
  templateUrl: 'artists.page.html',
  animations: [inOutAnimation],
})
export class ArtistsPage implements OnInit {
  items: Artist[] = [];
  view = 'gallery';
  body: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['created', 'desc'],
  };
  filterData!: FilterListI;
  loading = true;
  error = false;
  total = 0;
  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private toast: ToastService,
    private gaService: GoogleAnalyticsService,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.getFilter();
    this.getArtists();
  }

  getFilter() {
    this.filterData = getFilterList(this.route);
    if (this.filterData) {
      this.body.filter = this.filterData.data;
    }
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
      error: (error) => {
        this.loading = false;
        this.error = true;
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  goToPage(data: GoToPageI) {
    this.gaService.event('artists_link_profile', 'artists_link', 'artists');
    this.navigationService.goToPage(data);
  }

  onFilter(event: { name: string; value: string }) {
    this.gaService.event(
      `artists_filter_${event.name.toLowerCase()}_${event.value.toLowerCase()}`,
      'artists_filter',
      'artists'
    );
    this.body.page = 1;
    this.body.filter = [event.name, event.value];
    this.getArtists();
  }

  removeFilter() {
    this.gaService.event('artists_remove_filter', 'artists_filter', 'artists');
    this.body.page = 1;
    this.body.filter = [];
    this.getArtists();
  }

  onScroll() {
    this.body.page++;
    this.getArtists(true);
  }

  onClickTab(button: TabsItem) {
    if (button.action.includes('view')) {
      this.view = button.action;
      this.gaService.event(
        `artists_change_${button.action}`,
        'artists_filter',
        'artists'
      );
    } else {
      this.toast.showToast(TOAST_STATE.info, 'En construccion');
    }
  }

  onSearch(event: { text: string; type: string }) {
    if (event.text === '') {
      this.gaService.event(`artists_search_empty`, 'artists_search', 'artists');
      this.body.page = 1;
      this.getArtists();
    } else {
      this.gaService.event(
        `artists_search_${event.text}}`,
        'artists_search',
        'artists'
      );
      this.body.page = 1;
      this.body.filter = ['name', event.text];
      this.getArtists();
    }
  }
}
