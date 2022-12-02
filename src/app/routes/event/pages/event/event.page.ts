import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Event } from '@models';
import { MetaService, ToastService } from '@services';
import { EventService } from '@shared/services/api/event/event.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { NgxSpinnerService } from '@shared/services/system/ngx-spinner/ngx-spinner.service';
import { routesConfig } from '@core/config';
import { MetadataI } from '@shared/services/system/meta';
import * as moment from 'moment';
import { environment } from '@env/environment';

@Component({
  selector: 'page-event',
  templateUrl: 'event.page.html',
  animations: [inOutAnimation],
})
export class EventPage implements OnInit {
  event!: Event;
  events: Event[] = [];
  slug!: string;
  views: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.getEvent();
  }

  getEvent() {
    this.eventService.getOne('slug', this.slug).subscribe({
      next: (response) => {
        this.event = response;
        this.setMeta();
        this.setViews();
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  setMeta() {
    const meta: MetadataI = {
      title: `${this.event.name} @ ${this.event.site.name} - ${moment(this.event.date).format('DD-MM-YYYY')}`,
      image: `${environment.IMAGES_URL}/${this.event.images![0].url}`,
      url: `${environment.APP_URL}${routesConfig.event.replace(
        ':slug',
        this.event.slug!
      )}`,
    };
    if (this.event.info !== '') {
      meta.description = this.event.info;
    }
    this.metaService.setMetaDynamic(meta);
  }

  setViews() {
    if (this.event.artists && this.event.artists.length > 0) {
      this.views.push({
        name: 'Artistas',
        value: 'artist',
        counter: this.event.artists!.length,
      });
    }
  }
}
