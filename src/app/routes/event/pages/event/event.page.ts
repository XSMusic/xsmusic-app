import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Event } from '@models';
import { MetaService } from '@services';
import { EventService } from '@shared/services/api/event/event.service';
import { NgxSpinnerService } from '@shared/services/system/ngx-spinner/ngx-spinner.service';
import { routesConfig } from '@core/config';
import { MetadataI } from '@shared/services/system/meta';
import { environment } from '@env/environment';
import { DateFunctions } from '@shared/utils/dates';

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
    private router: Router,
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
      error: () => {
        this.spinner.hide();
        this.router.navigate(['/404'], {
          skipLocationChange: true,
          state: {
            type: 'event',
          },
        });
      },
    });
  }

  setMeta() {
    const meta: MetadataI = {
      title: `${this.event.name} @ ${
        this.event.site.name
      } - ${DateFunctions.new(this.event.date).format('DD-MM-YYYY')}`,
      image: `${environment.urls.images}/${this.event.images![0].url}`,
      url: `${environment.urls.app}${routesConfig.event.replace(
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
        counter: this.event.artists.length,
      });
    }
  }
}
