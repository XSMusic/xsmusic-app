import { Component } from '@angular/core';
import { Event, Media, Style } from '@models';
import { EventService, ToastService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StyleService } from '@shared/services/api/style/style.service';
import { countries } from 'assets/data/countries';
import { NgxSpinnerService } from '@shared/services/system/ngx-spinner/ngx-spinner.service';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';
import { routesConfig } from '@core/config';
import { OptionsItemI } from '@shared/components/ui/options-items/options-items.interface';

@Component({
  selector: 'page-admin-event',
  templateUrl: 'admin-event.page.html',
})
export class AdminEventPage {
  id!: string;
  event = new Event();
  styles: Style[] = [];
  title!: string;
  countries = countries;
  scraping: any = {
    images: [],
    infos: [],
  };
  view = 'viewInfo';
  options = [];
  constructor(
    private eventService: EventService,
    private styleService: StyleService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getStyles();
    if (this.id) {
      this.title = 'Editar Evento';
      this.getOne();
    } else {
      this.title = 'Nuevo Evento';
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
    this.eventService.getOne('id', this.id).subscribe({
      next: (response) => {
        this.event = response;
        this.spinner.hide();
      },
      error: (error) => {
        this.toastService.showToast(TOAST_STATE.error, error);
        this.spinner.hide();
      },
    });
  }

  onClickTab(event: TabsItem) {
    this.view = event.action;
  }

  goToProfile(data: { type: 'media' | 'site'; media: Media }) {
    this.router.navigate([
      routesConfig.eventAdmin.replace(':id', data.media._id!),
    ]);
  }

  onClickOptionItem(event: OptionsItemI) {
    if (event.action === 'goToAdminSetAdd') {
      this.router.navigate([
        routesConfig.setAdminAddData
          .replace(':source', 'default')
          .replace(':value', this.event.name),
      ]);
    } else if (event.action === 'goToAdminTrackAdd') {
      this.router.navigate([
        routesConfig.trackAdminAddData
          .replace(':source', 'default')
          .replace(':value', this.event.name),
      ]);
    }
  }
}
