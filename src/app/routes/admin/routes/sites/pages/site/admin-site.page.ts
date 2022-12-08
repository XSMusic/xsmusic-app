import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { Event, Media, Site } from '@models';
import {
  ToastService,
  SiteService,
  MediaService,
  EventService,
} from '@services';
import { OptionsItemI } from '@shared/components/ui/options-items/options-items.interface';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { NgxSpinnerService } from '@shared/services/system/ngx-spinner/ngx-spinner.service';
import { EventGetAllForTypeDto } from '@shared/services/api/event/event.dto';
import { MediaGetAllForTypeDto } from '@shared/services/api/media/media.dto';

@Component({
  selector: 'page-admin-site',
  templateUrl: 'admin-site.page.html',
})
export class AdminSitePage implements OnInit {
  id!: string;
  site: Site = new Site();
  title!: string;
  view = '';
  type!: 'club' | 'festival';
  options = [
    { name: 'Añadir Set', action: 'goToAdminSetAdd' },
    { name: 'Añadir Evento', action: 'goToAdminEventAdd' },
  ];
  bodyEvents: EventGetAllForTypeDto = {
    page: 1,
    pageSize: 10,
    order: ['created', 'asc'],
    id: '',
    type: 'site',
  };
  bodyMediaSet: MediaGetAllForTypeDto = {
    page: 1,
    pageSize: 10,
    order: ['created', 'asc'],
    id: '',
    type: 'site',
    typeMedia: 'set',
  };
  sets: Media[] = [];
  events: Event[] = [];

  constructor(
    private clubService: SiteService,
    private eventService: EventService,
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toast: ToastService,
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
        this.getEvents();
        this.getMediaSets();
        this.spinner.hide();
      },
      error: (error) => {
        this.toast.showToast(TOAST_STATE.error, error);
        this.spinner.hide();
      },
    });
  }

  getEvents() {
    this.bodyEvents.id = this.site._id!;
    this.eventService.getAllForType(this.bodyEvents).subscribe({
      next: (response) => (this.events = response.items),
      error: (err) => {
        this.toast.showToast(TOAST_STATE.error, err);
      },
    });
  }

  getMediaSets() {
    this.bodyMediaSet.id = this.site._id!;
    this.mediaService.getAllForType(this.bodyMediaSet).subscribe({
      next: (response) => (this.sets = response.items),
      error: (err) => {
        this.toast.showToast(TOAST_STATE.error, err);
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
      this.toast.showToast(TOAST_STATE.info, 'En construccion');
    }
  }
}
