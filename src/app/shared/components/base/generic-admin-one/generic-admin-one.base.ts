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
import { NgxSpinnerService } from '@shared/services/system/ngx-spinner/ngx-spinner.service';
import { routesConfig } from '@core/config';
import { EventGetAllForTypeDto } from '@shared/services/api/event/event.dto';
import { MediaGetAllForTypeDto } from '@shared/services/api/media/media.dto';
import { Observable } from 'rxjs';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { OptionsItemI } from '@shared/components/ui/options-items/options-items.interface';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';
import { DateFunctions } from '@shared/utils/dates';
import { MetadataI } from '@shared/services/system/meta';

@Component({
  selector: 'generic-admin-one-base',
  templateUrl: './generic-admin-one.base.html',
  animations: [inOutAnimation],
})
export class GenericAdminOneBase implements OnInit {
  @Input() type!: 'artist' | 'site' | 'event' | 'media';
  @Input() subType!: 'club' | 'festival' | 'set' | 'track';
  typeTabs!: 'artistAdmin' | 'eventAdmin' | 'siteAdmin' | 'mediaAdmin';
  artist = new Artist();
  site = new Site();
  event = new Event();
  media = new Media();
  id!: string;
  views: any[] = [];
  title!: string;
  events: Event[] = [];
  sets: Media[] = [];
  tracks: Media[] = [];
  view = 'viewList';
  options: { name: string; action: string }[] = [];
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
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.type) {
      this.setTypes();
      this.setTitle();
      this.setTypeTabs();
      this.setOptions();
      this.getItem();
    }
  }

  setTypes() {
    if (this.type === 'artist') {
      this.bodyEvents.type = `${this.type}s`;
      this.bodyMediaSet.type = `${this.type}s`;
      this.bodyMediaTrack.type = `${this.type}s`;
    } else if (this.type === 'site') {
      this.bodyEvents.type = `${this.type}`;
      this.bodyMediaSet.type = `${this.type}`;
      this.bodyMediaTrack.type = `${this.subType}s`;
    }
  }

  setTitle() {
    switch (this.type) {
      case 'artist':
        this.title = `${this.id ? 'Editar' : 'Nuevo'} Artista`;
        break;
      case 'site':
        const titleSite = this.subType === 'club' ? 'Clubs' : 'Festivales';
        this.title = `${this.id ? 'Editar' : 'Nuevo'} ${titleSite}`;
        break;
      case 'site':
        this.title = `${this.id ? 'Editar' : 'Nuevo'} Eventos`;
        break;
      case 'media':
        const titleMedia = this.subType === 'set' ? 'Sets' : 'Tracks';
        this.title = `${this.id ? 'Editar' : 'Nuevo'} ${titleMedia}`;
        break;
      default:
        break;
    }
  }

  setTypeTabs() {
    if (this.type === 'artist') {
      this.typeTabs = 'artistAdmin';
    } else if (this.type === 'event') {
      this.typeTabs = 'eventAdmin';
    } else if (this.type === 'site') {
      this.typeTabs = 'siteAdmin';
    } else if (this.type === 'media') {
      this.typeTabs = 'mediaAdmin';
    }
  }

  setOptions() {
    if (this.type === 'artist') {
      this.options.push(
        { name: 'Añadir Set', action: 'goToAdminSetAdd' },
        { name: 'Añadir Track', action: 'goToAdminTrackAdd' }
      );
    } else if (this.type === 'site') {
      this.options.push(
        { name: 'Añadir Set', action: 'goToAdminSetAdd' },
        { name: 'Añadir Evento', action: 'goToAdminEventAdd' }
      );
    }
  }

  getItem() {
    let service: Observable<any>;
    if (this.type === 'site') {
      service = this.siteService.getOne('id', this.id);
    } else if (this.type === 'event') {
      service = this.eventService.getOne('id', this.id);
    } else {
      service = this.artistService.getOne('id', this.id);
    }
    service.subscribe({
      next: (response: any) => {
        this[this.type] = response;
        this.setMeta();
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

  setMeta() {
    let title: string;
    if (this.type === 'event') {
      title = `${this.event.name} @ ${
        this.event.site.name
      } - ${DateFunctions.new(this.event.date).format('DD-MM-YYYY')}`;
    } else {
      title = this[this.type].name!;
    }
    const meta: MetadataI = {
      title: title,
    };
    this.metaService.setMetaDynamic(meta);
  }

  checkViews() {
    if (this.type === 'artist') {
      this.checkViewsArtist();
    } else if (this.type === 'site') {
      this.checkViewsSite();
    }
  }

  checkViewsArtist() {
    if (this.artist.sets && this.artist.sets.count > 0) {
      this.getMediaSets();
    }
    if (this.artist.tracks && this.artist.tracks.count > 0) {
      this.getMediaTracks();
    }
    if (this.artist.events && this.artist.events.count > 0) {
      this.getEvents();
    }
  }

  checkViewsSite() {
    if (this.site.sets && this.site.sets.count > 0) {
      this.getMediaSets();
    }
    if (this.site.events && this.site.events.count > 0) {
      this.getEvents();
    }
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

  goToPage(data: GoToPageI) {
    data.admin = true;
    this.navigationService.goToPage(data);
  }

  onClickTab(tab: TabsItem) {
    this.view = tab.action;
  }

  onClickOptionItem(event: OptionsItemI) {
    if (event.action === 'goToAdminSetAdd') {
      this.router.navigate([routesConfig.setsAdmin], {
        queryParams: {
          tab: 'viewAdd',
          source: 'default',
          value: this.artist.name,
        },
      });
    } else if (event.action === 'goToAdminTrackAdd') {
      this.router.navigate([routesConfig.tracksAdmin], {
        queryParams: {
          tab: 'viewAdd',
          source: 'default',
          value: this.artist.name,
        },
      });
    }
  }
}
