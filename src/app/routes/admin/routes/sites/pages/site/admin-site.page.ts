import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Site, Style } from '@models';
import { ToastService, SiteService, StyleService } from '@services';
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
    private toastService: ToastService
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
}
