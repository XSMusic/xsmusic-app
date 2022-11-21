import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { Site } from '@models';
import { ToastService, SiteService, StyleService } from '@services';
import { OptionsItemI } from '@shared/components/ui/options-items/options-items.interface';
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
  title!: string;
  view = '';
  type = '';
  options = [
    { name: 'Añadir Set', action: 'goToAdminSetAdd' },
    { name: 'Añadir Evento', action: 'goToAdminEventAdd' },
  ];

  constructor(
    private clubService: SiteService,
    private styleService: StyleService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getType();
    if (this.id) {
      this.title = 'Editar';
      this.getItem();
    } else {
      this.title = 'Nuevo';
      this.site.type = this.type;
    }
  }

  getType() {
    this.type = this.route.snapshot.routeConfig!.path!.includes('clubs')
      ? 'club'
      : 'festival';
  }

  getItem() {
    this.spinner.show();
    this.clubService.getOne('id', this.id).subscribe({
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

  onClickOptionItem(event: OptionsItemI) {
    if (event.action === 'goToAdminSetAdd') {
      this.router.navigate([
        routesConfig.setAdminAddData
          .replace(':source', 'default')
          .replace(':value', this.site.name!),
      ]);
    } else if (event.action === 'goToAdminEventAdd') {
      this.toastService.showToast(TOAST_STATE.info, 'En construccion');
    }
  }
}
