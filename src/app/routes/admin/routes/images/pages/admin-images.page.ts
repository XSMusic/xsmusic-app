import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { GetAllDto } from '@interfaces';
import { Image } from '@models';
import {
  ImageService,
  ModalService,
  MODAL_STATE,
  ToastService,
  TOAST_STATE,
} from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';

@Component({
  selector: 'page-admin-images',
  templateUrl: 'admin-images.page.html',
  animations: [inOutAnimation],
})
export class AdminImagesPage implements OnInit {
  title = '';
  items: Image[] = [];
  body: GetAllDto = {
    page: 1,
    pageSize: 40,
    order: ['updated', 'desc'],
  };
  loading = true;
  error = false;
  constructor(
    private imageService: ImageService,
    private toast: ToastService,
    private router: Router,
    private modal: ModalService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems(more = false) {
    this.imageService.getAll(this.body).subscribe({
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

  // goToProfile(item: Image) {
  //   this.router.navigate([routesConfig.clubAdmin.replace(':id', item._id!)]);
  // }

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
    if (button.action === 'order' || button.action === 'filter') {
      this.toast.showToast(TOAST_STATE.info, 'En construccion');
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
    const modal = this.modal.showModal(
      MODAL_STATE.info,
      'Eliminar Imagen',
      '¿Estas seguro de eliminar la imagen?',
      [
        { name: 'Si', action: true },
        { name: 'No', action: false },
      ]
    );
    const sub$ = modal.subscribe({
      next: (response) => {
        if (response !== '') {
          if (response === true) {
            this.imageService.deleteOne(item._id!).subscribe({
              next: (response) => {
                this.toast.showToast(TOAST_STATE.success, response.message);
                this;
              },
              error: (error) => this.toast.showToast(TOAST_STATE.error, error),
            });
          }
          sub$.unsubscribe();
        }
      },
    });
  }
}
