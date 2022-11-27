import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { GetAllDto } from '@interfaces';
import { Media } from '@models';
import { MediaService, ToastService } from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'page-sets',
  templateUrl: 'sets.page.html',
})
export class SetsPage implements OnInit {
  items: Media[] = [];
  body: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['created', 'desc'],
    type: 'set',
  };
  loading = true;
  error = false;
  view = 'viewGallery';
  total = 0;
  constructor(
    private mediaService: MediaService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems(more = false): void {
    this.mediaService.getAll(this.body).subscribe({
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

  onClickButton(button: ButtonBlockItem) {
    if (button.action.includes('view')) {
      this.view = button.action;
    } else {
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

  onClickItemViewGallery(item: Media) {
    this.router.navigate([routesConfig.set.replace(':slug', item.slug!)]);
  }

  onClickItemViewList(data: { type: 'media' | 'site'; media: Media }) {
    if (data.type === 'media') {
      this.router.navigate([
        routesConfig.set.replace(':slug', data.media.slug!),
      ]);
    } else {
      if (data.media.site.type === 'club') {
        this.router.navigate([
          routesConfig.club.replace(':slug', data.media.site.slug!),
        ]);
      } else if (data.media.site.type === 'festival') {
        this.router.navigate([
          routesConfig.festival.replace(':slug', data.media.site.slug!),
        ]);
      }
    }
  }

  onFilter(event: { name: string; value: string }) {
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
