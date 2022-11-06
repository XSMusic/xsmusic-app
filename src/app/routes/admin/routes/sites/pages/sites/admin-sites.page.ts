import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { GetAllDto } from '@interfaces';
import { Site } from '@models';
import { SiteService, ToastService } from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'page-admin-sites',
  templateUrl: 'admin-sites.page.html',
})
export class AdminSitesPage implements OnInit {
  title = '';
  sites: Site[] = [];
  body: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['updated', 'desc'],
  };
  type = '';
  loading = true;
  error = false;
  constructor(
    private route: ActivatedRoute,
    private clubService: SiteService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.routeConfig!.path!;
    if (this.type === 'clubs') {
      this.title = 'Clubs';
      this.body.type = 'club';
    } else {
      this.title = 'Festivales';
      this.body.type = 'festival';
    }
    this.getClubs();
  }

  getClubs(more = false) {
    this.clubService.getAll(this.body).subscribe({
      next: (response) => {
        if (!more) {
          this.sites = response.items;
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
  goToProfile(item: Site) {
    this.router.navigate([routesConfig.clubAdmin.replace(':id', item._id!)]);
  }

  filter(event: { name: string; value: string }) {
    this.body.page = 1;
    this.body.filter = [event.name, event.value];
    this.getClubs();
  }

  removeFilter() {
    this.body.page = 1;
    this.body.filter = [];
    this.getClubs();
  }

  onScroll() {
    this.body.page++;
    this.getClubs(true);
  }

  onClickButton(button: ButtonBlockItem) {
    if (button.action === 'order' || button.action === 'filter') {
      this.toast.showToast(TOAST_STATE.info, 'En construccion');
    } else if (button.action === 'add') {
      this.router.navigate([routesConfig.clubAdminAdd]);
    }
  }

  onSearch(event: { text: string; type: string }) {
    if (event.text === '') {
      this.body.page = 1;
      this.getClubs();
    } else {
      this.body.page = 1;
      this.body.filter = ['name', event.text];
      this.getClubs();
    }
  }
}
