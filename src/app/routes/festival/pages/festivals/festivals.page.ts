import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { GetAllDto } from '@interfaces';
import { Site } from '@models';
import { SiteService, ToastService } from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'page-festivals',
  templateUrl: 'festivals.page.html',
})
export class FestivalsPage implements OnInit {
  items: Site[] = [];
  body: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['updated', 'desc'],
    type: 'festival',
  };
  view = 'gallery';
  loading = true;
  error = false;
  constructor(
    private siteService: SiteService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems(more = false): void {
    this.siteService.getAll(this.body).subscribe({
      next: (response) => {
        if (!more) {
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

  onClickButton(button: ButtonBlockItem) {
    if (button.action.includes('view')) {
      this.view = button.action;
    } else if (button.action === 'order' || button.action === 'filter') {
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

  goToProfile(site: Site) {
    this.router.navigate([routesConfig.festival.replace(':slug', site.slug!)]);
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
}
