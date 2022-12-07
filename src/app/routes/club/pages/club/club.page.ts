import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Event, Media, Site } from '@models';
import {
  EventService,
  MediaService,
  MetaService,
  SiteService,
  ToastService,
} from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { NgxSpinnerService } from '@shared/services/system/ngx-spinner/ngx-spinner.service';
import { MetadataI } from '@shared/services/system/meta';
import { environment } from '@env/environment';
import { EventGetAllForTypeDto } from '@shared/services/api/event/event.dto';
import { MediaGetAllForTypeDto } from '@shared/services/api/media/media.dto';

@Component({
  selector: 'page-club',
  templateUrl: 'club.page.html',
  animations: [inOutAnimation],
})
export class ClubPage implements OnInit {
  site!: Site;
  slug!: string;
  views: any[] = [];
  bodyEvents: EventGetAllForTypeDto = {
    page: 1,
    pageSize: 10,
    order: ['created', 'asc'],
    id: '',
    type: 'site',
  };
  bodyMedia: MediaGetAllForTypeDto = {
    page: 1,
    pageSize: 10,
    order: ['created', 'asc'],
    id: '',
    type: 'site',
    typeMedia: 'set',
  };
  events: Event[] = [];
  sets: Media[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private siteService: SiteService,
    private eventService: EventService,
    private mediaService: MediaService,
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.getItem();
  }

  getItem() {
    this.siteService.getOne('slug', this.slug).subscribe({
      next: (response: any) => {
        this.site = response;
        this.setMeta();
        this.setViews();
        if (this.views.filter((item) => item.name === 'Sets').length > 0) {
          this.getMedia();
        }
        if (this.views.filter((item) => item.name === 'Eventos').length > 0) {
          this.getEvents();
        }


        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  getEvents() {
    this.bodyEvents.id = this.site._id!;
    this.eventService.getAllForType(this.bodyEvents).subscribe({
      next: (response) => (this.events = response.items),
      error: (err) => {
        this.views = this.views.filter((item) => item.name !== 'Eventos');
        this.toast.showToast(TOAST_STATE.error, err);
      },
    });
  }

  getMedia() {
    this.bodyMedia.id = this.site._id!;
    this.mediaService.getAllForType(this.bodyMedia).subscribe({
      next: (response) => (this.sets = response.items),
      error: (err) => {
        this.views = this.views.filter((item) => item.name !== 'Sets');
        this.toast.showToast(TOAST_STATE.error, err);
      },
    });
  }

  private setMeta() {
    const meta: MetadataI = {
      title: this.site.name!,
      image: `${environment.urls.images}/${this.site.images![0].url}`,
      url: `${environment.urls.app}${routesConfig.club.replace(
        ':slug',
        this.site.slug!
      )}`,
    };
    if (this.site.info !== '') {
      meta.description = this.site.info;
    }
    this.metaService.setMetaDynamic(meta);
  }

  private setViews() {
    if (this.site.events && this.site.events.count > 0) {
      this.views.push({
        name: 'Eventos',
        value: 'eventSite',
        counter: this.site.events ? this.site.events.count : 0,
      });
    }
    if (this.site.sets && this.site.sets.count > 0) {
      this.views.push({
        name: 'Sets',
        value: 'set',
        counter: this.site.sets.count,
      });
    }
    if (this.site.images && this.site.images.length > 1) {
      this.views.push({
        name: 'Imagenes',
        value: 'image',
        counter:
          this.site.images.length === 0
            ? this.site.images.length
            : this.site.images.length - 1,
      });
    }
  }

  goTo(club: Site) {
    this.router.navigate([routesConfig.club.replace(':id', club._id!)]);
  }
}
