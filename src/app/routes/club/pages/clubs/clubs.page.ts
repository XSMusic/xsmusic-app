import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { Site } from '@models';
import { SiteService, ToastService } from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { SiteGetAllDto } from '@shared/services/api/site/site.dto';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { getUserLocation } from '@shared/utils';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'page-clubs',
  templateUrl: 'clubs.page.html',
})
export class ClubsPage implements OnInit {
  title = '';
  items: Site[] = [];
  itemsMap: Site[] = [];
  body: SiteGetAllDto = {
    page: 1,
    pageSize: 30,
    order: ['created', 'desc'],
    type: 'club',
    map: false,
  };
  bodyMap: SiteGetAllDto = {
    page: 1,
    pageSize: 1000,
    order: ['created', 'desc'],
    type: 'club',
    map: true,
    maxDistance: 1000,
  };
  filterKey?: string;
  filterValue?: string;
  view = 'gallery';
  total = 0;
  loading = true;
  error = false;
  constructor(
    private siteService: SiteService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
    private gaService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.getFilter();
    this.getItems();
  }

  getFilter() {
    this.filterKey = this.route.snapshot.paramMap.get('filterKey')!;
    this.filterValue = this.route.snapshot.paramMap.get('filterValue')!;
    if (this.filterKey && this.filterValue) {
      this.body.filter = [this.filterKey, this.filterValue];
    }
  }

  getItems(more = false): void {
    this.siteService.getAll(this.body).subscribe({
      next: (response) => {
        if (!more) {
          this.total = response.paginator.total;
          this.items = response.items;
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

  async getItemsMap() {
    const userCoordinates = await getUserLocation();
    this.bodyMap.coordinates = userCoordinates;
    this.siteService.getAll(this.bodyMap).subscribe({
      next: (response) => {
        this.itemsMap = response.items;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  onClickButton(button: ButtonBlockItem) {
    if (button.action.includes('view')) {
      this.view = button.action;
      if (this.view === 'viewMap' && this.itemsMap.length === 0) {
        this.getItemsMap();
      }
      this.gaService.event(
        `clubs_change_${button.action}`,
        'clubs_filter',
        'clubs'
      );
    } else if (button.action === 'order') {
      this.toast.showToast(TOAST_STATE.info, 'En construccion');
    }
  }

  onSearch(event: { text: string; type: string }) {
    if (event.text === '') {
      this.gaService.event(`clubs_search_empty`, 'clubs_search', 'clubs');
      this.body.page = 1;
      this.getItems();
    } else {
      this.gaService.event(
        `clubs_search_${event.text}}`,
        'clubs_search',
        'clubs'
      );
      this.body.page = 1;
      this.body.filter = ['name', event.text];
      this.getItems();
    }
  }

  goToProfile(site: Site) {
    this.gaService.event('clubs_link_profile', 'clubs_link', 'clubs');
    this.router.navigate([routesConfig.club.replace(':slug', site.slug!)]);
  }

  onFilter(event: { name: string; value: string }) {
    this.gaService.event(
      `clubs_filter_${event.name.toLowerCase()}_${event.value.toLowerCase()}`,
      'clubs_filter',
      'clubs'
    );
    this.body.page = 1;
    this.body.filter = [event.name, event.value];
    this.getItems();
  }

  removeFilter() {
    this.gaService.event('clubs_remove_filter', 'clubs_filter', 'clubs');
    this.body.page = 1;
    this.body.filter = [];
    this.getItems();
  }

  onScroll() {
    this.body.page++;
    this.getItems(true);
  }

  goToAdmin() {
    this.gaService.event('clubs_link_admin', 'artists_link', 'artists');
    this.router.navigate([routesConfig.clubsAdmin]);
  }
}
