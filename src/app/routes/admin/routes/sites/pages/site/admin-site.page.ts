import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Site, Style } from '@models';
import { ToastService, SiteService, StyleService, GeoService } from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'page-admin-site',
  templateUrl: 'admin-site.page.html',
})
export class AdminSitePage implements OnInit {
  id!: string;
  site: Site = new Site();
  styles: Style[] = [];
  title!: string;
  view = '';
  options = [
    { name: 'Obtener coordenadas', action: 'addressToCoordinates' },
    { name: 'Obtener direccion', action: 'coordinatesToAddress' },
  ];

  constructor(
    private clubService: SiteService,
    private styleService: StyleService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastService: ToastService,
    private geoService: GeoService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getStyles();
    if (this.id) {
      this.title = 'Editar';
      this.getOne();
    } else {
      this.title = 'Nuevo';
    }
  }

  getStyles() {
    this.styleService
      .getAll({ page: 1, pageSize: 100, order: ['name', 'asc'] })
      .subscribe({
        next: (response) => (this.styles = response.items),
        error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
      });
  }

  getOne() {
    this.spinner.show();
    this.clubService.getOne({ id: this.id }).subscribe({
      next: (response) => {
        this.site = response;
        this.spinner.hide();
      },
      error: (error) => {
        this.toastService.showToast(TOAST_STATE.error, error);
        this.spinner.hide();
      },
    });
  }

  onClickButton(event: ButtonBlockItem) {
    this.view = event.action;
  }

  onClickOptionItem(action: string) {
    if (action === 'addressToCoordinates') {
      this.addressToCoordinates();
    } else if (action === 'coordinatesToAddress') {
      this.coordinatesToAddress();
    }
  }

  addressToCoordinates() {
    if (this.site.address.street !== '' && this.site.address.city !== '') {
      this.geoService
        .addressToCoordinates(
          `${this.site.address.street} ${this.site.address.city}`
        )
        .subscribe({
          next: (response) =>
            (this.site.address.coordinates = response.coordinates),
          error: (error) =>
            this.toastService.showToast(TOAST_STATE.error, error),
        });
    } else {
      this.toastService.showToast(TOAST_STATE.error, 'Revisa la direccion');
    }
  }

  coordinatesToAddress() {
    // if (this.site.address.street !== '' && this.site.address.city !== '') {
    if (this.site.address.coordinates.length === 2) {
      this.geoService
        .coordinatesToAddress(
          this.site.address.coordinates[0],
          this.site.address.coordinates[1]
        )
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) =>
            this.toastService.showToast(TOAST_STATE.error, error),
        });
    } else {
      this.toastService.showToast(TOAST_STATE.error, 'Revisa las coordenadas');
    }
  }
}
