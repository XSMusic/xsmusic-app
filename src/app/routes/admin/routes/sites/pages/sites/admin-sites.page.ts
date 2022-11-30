import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { GetAllDto } from '@interfaces';
import { Site } from '@models';
import { SiteService, StatsService, ToastService } from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { StatsGetTopStatsI } from '@shared/services/api/stats/stats.interface';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'page-admin-sites',
  templateUrl: 'admin-sites.page.html',
})
export class AdminSitesPage implements OnInit {
  title = '';
  sites: Site[] = [];
  site: Site = new Site();
  stats: StatsGetTopStatsI = {
    topSocial: [],
    topCountries: [],
  };
  body: GetAllDto = {
    page: 1,
    pageSize: 30,
    order: ['updated', 'desc'],
  };
  type!: 'club' | 'festival';
  view = 'viewList';
  loading = true;
  error = false;
  total = 0;
  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService,
    private statsService: StatsService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.routeConfig!.path!.includes('clubs')
      ? 'club'
      : 'festival';
    if (this.type === 'club') {
      this.title = 'Clubs';
      this.body.type = 'club';
    } else {
      this.title = 'Festivales';
      this.body.type = 'festival';
    }
    this.getItems();
    this.getStats();
  }

  getItems(more = false) {
    this.siteService.getAll(this.body).subscribe({
      next: (response) => {
        if (!more) {
          this.sites = response.items;
          this.total = response.paginator.total;
        } else {
          this.sites = this.sites.concat(response.items);
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
    this.statsService.getTopStats({ type: this.type, limit: 6 }).subscribe({
      next: (response) => {
        this.stats = response;
      },
      error: (error) => this.toast.showToast(TOAST_STATE.error, error),
    });
  }

  goToProfile(item: Site) {
    this.router.navigate([
      this.body.type === 'club'
        ? routesConfig.clubAdmin.replace(':id', item._id!)
        : routesConfig.festivalAdmin.replace(':id', item._id!),
    ]);
  }

  filter(event: { name: string; value: string }) {
    this.body.page = 1;
    this.body.filter = [event.name, event.value];
    this.getItems();
  }

  removeFilter() {
    this.body.page = 1;
    this.body.filter = [];
    this.getItems();
  }

  onScroll() {
    this.body.page++;
    this.getItems(true);
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
      this.getItems();
    } else {
      this.body.page = 1;
      this.body.filter = ['name', event.text];
      this.getItems();
    }
  }

  onCreatedSite() {
    this.getItems();
    this.site = new Site();
    this.view = 'viewList';
  }
}
