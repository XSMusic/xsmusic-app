import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Artist, Event, Media, Site } from '@models';
import {
  EventService,
  MediaService,
  MetaService,
  NavigationService,
  SiteService,
  ToastService,
  TOAST_STATE,
} from '@services';
import { ArtistService } from '@shared/services/api/artist/artist.service';
import { MetadataI } from '@shared/services/system/meta';
import { NgxSpinnerService } from '@shared/services/system/ngx-spinner/ngx-spinner.service';
import { environment } from '@env/environment';
import { routesConfig } from '@core/config';
import { EventGetAllForTypeDto } from '@shared/services/api/event/event.dto';
import { MediaGetAllForTypeDto } from '@shared/services/api/media/media.dto';
import { Observable } from 'rxjs';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { DateFunctions } from '@shared/utils/dates';

@Component({
  selector: 'generic-one-base',
  templateUrl: './generic-one.base.html',
  animations: [inOutAnimation],
})
export class GenericOneBase implements OnInit {
  @Input() type!: 'artist' | 'site' | 'event';
  @Input() subType!: 'club' | 'festival';
  artist!: Artist;
  site!: Site;
  event!: Event;
  slug!: string;
  views: any[] = [];
  bodyEvents: EventGetAllForTypeDto = {
    page: 1,
    pageSize: 10,
    order: ['created', 'asc'],
    id: '',
    type: '',
  };
  bodyMediaSet: MediaGetAllForTypeDto = {
    page: 1,
    pageSize: 10,
    order: ['created', 'asc'],
    id: '',
    type: '',
    typeMedia: 'set',
  };
  bodyMediaTrack: MediaGetAllForTypeDto = {
    page: 1,
    pageSize: 10,
    order: ['created', 'asc'],
    id: '',
    type: '',
    typeMedia: 'track',
  };
  events: Event[] = [];
  sets: Media[] = [];
  tracks: Media[] = [];

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private siteService: SiteService,
    private mediaService: MediaService,
    private eventService: EventService,
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private metaService: MetaService,
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.setTypes();
    if (this.type) {
      this.getItem();
    }
  }

  setTypes() {
    if (this.type === 'artist') {
      this.bodyEvents.type = `${this.type}s`;
      this.bodyMediaSet.type = `${this.type}s`;
      this.bodyMediaTrack.type = `${this.type}s`;
    } else if (this.type === 'site') {
      this.bodyEvents.type = `${this.subType}s`;
      this.bodyMediaSet.type = `${this.subType}s`;
      this.bodyMediaTrack.type = `${this.subType}s`;
    }
  }

  getItem() {
    let service: Observable<any>;
    if (this.type === 'site') {
      service = this.siteService.getOne('slug', this.slug);
    } else if (this.type === 'event') {
      service = this.eventService.getOne('slug', this.slug);
    } else {
      service = this.artistService.getOne('slug', this.slug);
    }
    service.subscribe({
      next: (response: any) => {
        this[this.type] = response;
        this.setMeta();
        this.setViews();
        this.checkViews();
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
        this.router.navigate(['/404'], {
          skipLocationChange: true,
          state: {
            type: this.type === 'site' ? this.subType : this.type,
          },
        });
      },
    });
  }

  getEvents() {
    this.bodyEvents.id = this[this.type]._id!;
    this.eventService.getAllForType(this.bodyEvents).subscribe({
      next: (response) => (this.events = response.items),
      error: (err) => {
        this.views = this.views.filter((item) => item.name !== 'Eventos');
        this.toast.showToast(TOAST_STATE.error, err);
      },
    });
  }

  getMediaSets() {
    this.bodyMediaSet.id = this[this.type]._id!;
    this.mediaService.getAllForType(this.bodyMediaSet).subscribe({
      next: (response) => (this.sets = response.items),
      error: (err) => {
        this.views = this.views.filter((item) => item.name !== 'Sets');
        this.toast.showToast(TOAST_STATE.error, err);
      },
    });
  }

  getMediaTracks() {
    this.bodyMediaTrack.id = this[this.type]._id!;
    this.mediaService.getAllForType(this.bodyMediaTrack).subscribe({
      next: (response) => (this.tracks = response.items),
      error: (err) => {
        this.views = this.views.filter((item) => item.name !== 'Sets');
        this.toast.showToast(TOAST_STATE.error, err);
      },
    });
  }

  setMeta() {
    let title: string;
    if (this.type === 'event') {
      title = `${this.event.name} @ ${
        this.event.site.name
      } - ${DateFunctions.new(this.event.date).format('DD-MM-YYYY')}`;
    } else {
      title = this[this.type].name!;
    }
    const typeRoute = this.type === 'site' ? this.subType : this.type;
    const meta: MetadataI = {
      title: title,
      image: `${environment.urls.images}/${this[this.type].images![0].url}`,
      url: `${environment.urls.app}${routesConfig[typeRoute].replace(
        ':slug',
        this[this.type].slug!
      )}`,
    };
    if (this[this.type].info !== '') {
      meta.description = this[this.type].info;
    }
    this.metaService.setMetaDynamic(meta);
  }

  setViews() {
    if (this.type === 'artist' || this.type === 'site') {
      if (this[this.type].sets && this[this.type].sets.count > 0) {
        this.views.push({
          name: 'Sets',
          value: 'set',
          counter: this[this.type].sets.count,
        });
      }
      if (
        this.type === 'artist' &&
        this.artist.tracks &&
        this.artist.tracks.count > 0
      ) {
        this.views.push({
          name: 'Tracks',
          value: 'track',
          counter: this.artist.tracks.count,
        });
      }

      if (this[this.type].events && this[this.type].events.count > 0) {
        this.views.push({
          name: 'Eventos',
          value: 'event',
          counter: this[this.type].events ? this[this.type].events.count : 0,
        });
      }
    }
    if (this.type === 'event') {
      this.views.push({
        name: 'Artistas',
        value: 'artist',
        counter: this.event.artists!.length,
      });
    }
    if (this[this.type].images && this[this.type].images!.length > 1) {
      this.views.push({
        name: 'Imagenes',
        value: 'image',
        counter:
          this[this.type].images && this[this.type].images!.length === 0
            ? this[this.type].images!.length
            : this[this.type].images!.length - 1,
      });
    }
  }

  checkViews() {
    if (this.views.filter((item) => item.name === 'Sets').length > 0) {
      this.getMediaSets();
    }
    if (this.views.filter((item) => item.name === 'Tracks').length > 0) {
      this.getMediaTracks();
    }
    if (this.views.filter((item) => item.name === 'Eventos').length > 0) {
      this.getEvents();
    }
  }

  goToPage(data: GoToPageI) {
    console.log(data);
    this.navigationService.goToPage(data);
  }
}
