import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { GetAllDto } from '@interfaces';
import { Media } from '@models';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { MediaService } from '@shared/services/api/media/media.service';
import {
  ToastService,
  TOAST_STATE,
} from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'page-admin-media-list',
  templateUrl: 'admin-media-list.page.html',
  animations: [inOutAnimation],
})
export class AdminMediaListPage implements OnInit {
  title = '';
  items: Media[] = [];
  body: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['updated', 'desc'],
    type: '',
  };
  type = '';
  loading = true;
  error = false;
  constructor(
    private route: ActivatedRoute,
    private mediaService: MediaService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.routeConfig!.path!;
    if (this.type === 'sets') {
      this.title = 'Sets';
      this.body.type = 'set';
    } else {
      this.title = 'Tracks';
      this.body.type = 'track';
    }
    this.getItems();
  }

  getItems(more = false): void {
    this.mediaService.getAll(this.body).subscribe({
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
    if (button.action === 'order' || button.action === 'filter') {
      this.toast.showToast(TOAST_STATE.info, 'En construccion');
    } else if (button.action === 'add') {
      const route =
        this.type === 'sets'
          ? [routesConfig.setAdminAdd]
          : [routesConfig.trackAdminAdd];
      this.router.navigate(route);
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

  goToProfile(data: { type: 'site' | 'media'; media: Media }) {
    const route =
      this.type === 'sets'
        ? [routesConfig.setAdmin.replace(':id', data.media._id!)]
        : [routesConfig.trackAdmin.replace(':id', data.media._id!)];
    this.router.navigate(route);
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
