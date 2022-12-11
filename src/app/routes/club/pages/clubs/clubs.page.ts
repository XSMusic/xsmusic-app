import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterListI } from '@interfaces';
import { Site } from '@models';
import { NavigationService, SiteService, ToastService } from '@services';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { SiteGetAllDto } from '@shared/services/api/site/site.dto';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { getFilterList, getUserLocation } from '@shared/utils';
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
  filterData!: FilterListI;
  view = 'gallery';
  total = 0;
  loading = true;
  error = false;
  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private gaService: GoogleAnalyticsService,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.getFilter();
    this.getItems();
  }

  getFilter() {
    this.filterData = getFilterList(this.route);
    if (this.filterData) {
      this.body.filter = this.filterData.data;
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

  onClickTab(button: TabsItem) {
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

  goToPage(data: GoToPageI) {
    this.navigationService.goToPage(data);
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
}
