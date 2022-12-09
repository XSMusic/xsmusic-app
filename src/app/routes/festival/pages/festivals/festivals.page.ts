import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { Site } from '@models';
import { SiteService, ToastService } from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { SiteGetAllDto } from '@shared/services/api/site/site.dto';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { getUserLocation } from '@shared/utils';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'page-festivals',
  templateUrl: 'festivals.page.html',
})
export class FestivalsPage implements OnInit {
  items: Site[] = [];
  itemsMap: Site[] = [];
  body: SiteGetAllDto = {
    page: 1,
    pageSize: 30,
    order: ['created', 'desc'],
    type: 'festival',
    map: false,
  };
  bodyMap: SiteGetAllDto = {
    page: 1,
    pageSize: 1000,
    order: ['created', 'desc'],
    type: 'festival',
    map: true,
    maxDistance: 5000,
  };
  filterKey?: string;
  filterValue?: string;
  view = 'gallery';
  loading = true;
  error = false;
  total = 0;
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
        `festivals_change_${button.action}`,
        'festivals_filter',
        'festivals'
      );
    } else if (button.action === 'order' || button.action === 'filter') {
      this.toast.showToast(TOAST_STATE.info, 'En construccion');
    }
  }

  onSearch(event: { text: string; type: string }) {
    if (event.text === '') {
      this.gaService.event(
        `festivals_search_empty`,
        'festivals_search',
        'festivals'
      );
      this.body.page = 1;
      this.getItems();
    } else {
      this.gaService.event(
        `festivals_search_${event.text}}`,
        'festivals_search',
        'festivals'
      );
      this.body.page = 1;
      this.body.filter = ['name', event.text];
      this.getItems();
    }
  }

  goToPage(event: GoToPageI) {
    this.gaService.event(
      'festivals_link_profile',
      'festivals_link',
      'festivals'
    );
    this.router.navigate([
      routesConfig.festival.replace(':slug', event.item.slug!),
    ]);
  }

  onFilter(event: { name: string; value: string }) {
    this.gaService.event(
      `festivals_filter_${event.name.toLowerCase()}_${event.value.toLowerCase()}`,
      'festivals_filter',
      'festivals'
    );
    this.body.page = 1;
    this.body.filter = [event.name, event.value];
    this.getItems();
  }

  removeFilter() {
    this.gaService.event(
      'festivals_remove_filter',
      'festivals_filter',
      'festivals'
    );
    this.body.page = 1;
    this.body.filter = [];
    this.getItems();
  }

  onScroll() {
    this.body.page++;
    this.getItems(true);
  }

  goToAdmin() {
    this.gaService.event('festivals_link_admin', 'artists_link', 'artists');
    this.router.navigate([routesConfig.festivalsAdmin]);
  }
}
