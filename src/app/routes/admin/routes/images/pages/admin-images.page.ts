import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Image } from '@models';
import { ApiService, TOAST_STATE, UIService } from '@services';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';
import { GetAllDto } from '@shared/services/api/api.dtos';

@Component({
  selector: 'page-admin-images',
  templateUrl: 'admin-images.page.html',
  animations: [inOutAnimation],
})
export class AdminImagesPage implements OnInit {
  title = '';
  items: Image[] = [];
  body = new GetAllDto({
    pageSize: 40,
  });
  loading = true;
  error = false;
  constructor(
    private apiService: ApiService,
    private ui: UIService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems(more = false) {
    this.apiService.getAll<Image>('images', this.body).subscribe({
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
    this.body.page!++;
    this.getItems(true);
  }

  onClickTab(button: TabsItem) {
    if (button.action === 'order' || button.action === 'filter') {
      this.ui.toast.showToast(TOAST_STATE.info, 'En construccion');
    } else if (button.action === 'add') {
      this.router.navigate([routesConfig.imageAdminAdd]);
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

  onDelete(item: Image) {
    const modal = this.ui.modal.showModalConfirm(
      'Eliminar Imagen',
      '¿Estas seguro de eliminar la imagen?'
    );
    const sub$ = modal.subscribe({
      next: (response) => {
        if (response !== '') {
          if (response === true) {
            this.apiService.deleteOne('images', item._id!).subscribe({
              next: (response) => {
                this.ui.toast.showToast(TOAST_STATE.success, response.message);
                this.body.page = 1;
                this.getItems();
              },
              error: (error) =>
                this.ui.toast.showToast(TOAST_STATE.error, error),
            });
          }
          sub$.unsubscribe();
        }
      },
    });
  }
}
