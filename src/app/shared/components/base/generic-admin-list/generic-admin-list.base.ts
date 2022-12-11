import { Component, Input } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { GetAllDto } from '@interfaces';
import { Artist, Event, Site } from '@models';
import {
  ArtistService,
  EventService,
  NavigationService,
  SiteService,
  StatsService,
  ToastService,
  TOAST_STATE,
} from '@services';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { EventGetAllDto } from '@shared/services/api/event/event.dto';
import { SiteGetAllDto } from '@shared/services/api/site/site.dto';
import { StatsGetTopStatsI } from '@shared/services/api/stats/stats.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'generic-admin-list-base',
  templateUrl: 'generic-admin-list.base.html',
  animations: [inOutAnimation],
})
export class GenericAdminListBase {
  @Input() type!: 'artist' | 'site' | 'event';
  @Input() subType!: 'club' | 'festival';
  typeItems!: 'artists' | 'sites' | 'events';
  typeBody!: 'bodyArtist' | 'bodySite' | 'bodyEvent';
  typeTabs!: 'artistsAdmin' | 'eventsAdmin' | 'sitesAdmin';
  title!: string;
  artists: Artist[] = [];
  sites: Site[] = [];
  events: Event[] = [];
  artist: Artist = new Artist();
  site: Site = new Site();
  event: Event = new Event();
  stats: StatsGetTopStatsI = {
    topSocial: [],
    topCountries: [],
  };
  bodyArtist: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['updated', 'desc'],
  };
  bodySite: SiteGetAllDto = {
    page: 1,
    pageSize: 20,
    map: false,
    type: '',
    order: ['updated', 'desc'],
  };
  bodyEvent: EventGetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['date', 'asc'],
  };
  view!: string;
  filter = false;
  loading = true;
  error = false;
  total = 0;
  constructor(
    private artistService: ArtistService,
    private siteService: SiteService,
    private eventService: EventService,
    private statsService: StatsService,
    private toast: ToastService,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    if (this.type) {
      this.setTitle();
      this.setTypeTabs();
      this.getItems();
      this.getStats();
    }
  }

  setTitle() {
    if (this.type === 'artist') {
      this.title = 'Artistas';
    } else if (this.type === 'site') {
      this.title = this.subType === 'club' ? 'Clubs' : 'Festivales';
    } else if (this.type === 'event') {
      this.title = 'Eventos';
    }
  }

  setTypeTabs() {
    if (this.type === 'artist') {
      this.typeTabs = 'artistsAdmin';
    } else if (this.type === 'event') {
      this.typeTabs = 'eventsAdmin';
    } else if (this.type === 'site') {
      this.typeTabs = 'sitesAdmin';
    }
  }

  getItems(more = false) {
    let service: Observable<any>;
    if (this.type === 'site') {
      this.bodySite.type = this.subType;
      service = this.siteService.getAll(this.bodySite);
      this.typeItems = 'sites';
      this.typeBody = 'bodySite';
    } else if (this.type === 'event') {
      service = this.eventService.getAll(this.bodyEvent);
      this.typeItems = 'events';
      this.typeBody = 'bodySite';
    } else {
      service = this.artistService.getAll(this.bodyArtist);
      this.typeItems = 'artists';
      this.typeBody = 'bodyArtist';
    }

    service.subscribe({
      next: (response) => {
        if (!more) {
          this[this.typeItems] = response.items;
          this.total = response.paginator.total;
        } else {
          let data: any = this[this.type];
          data = data.concat(response.items);
          this[this.typeItems] = data;
        }
        this.loading = false;
        this.error = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  getStats() {
    if (this.type !== 'event') {
      const type =
        this.type === 'artist'
          ? 'artist'
          : this.subType === 'club'
          ? 'club'
          : 'festival';
      this.statsService.getTopStats({ type: type, limit: 10 }).subscribe({
        next: (response) => {
          this.stats = response;
        },
        error: (error) => this.toast.showToast(TOAST_STATE.error, error),
      });
    }
  }

  goToPage(data: GoToPageI) {
    if (data.admin === undefined) {
      data.admin = true;
    }
    if (!data.type) {
      if (this.type === 'artist' || this.type === 'event') {
        data.type = this.type;
      } else {
        data.type = this.subType === 'club' ? 'club' : 'festival';
      }
    }
    this.navigationService.goToPage(data);
  }

  onFilter(event: { name: string; value: string }) {
    this[this.typeBody].page = 1;
    this[this.typeBody].filter = [event.name, event.value];
    this.filter = true;
    this.getItems();
  }

  removeFilter() {
    this[this.typeBody].page = 1;
    this[this.typeBody].filter = [];
    this.filter = false;
    this.getItems();
  }

  onScroll() {
    this[this.typeBody].page++;
    this.getItems(true);
  }

  onClickTab(tab: TabsItem) {
    if (tab.action.includes('view')) {
      this.view = tab.action;
    } else if (tab.action === 'order') {
      this.toast.showToast(TOAST_STATE.info, 'En construccion');
    }
  }

  onSearch(event: { text: string; type: string }) {
    if (event.text === '') {
      this[this.typeBody].page = 1;
      this.getItems();
      this.filter = false;
    } else {
      this[this.typeBody].page = 1;
      this[this.typeBody].filter = ['name', event.text];
      this.filter = true;
      this.getItems();
    }
  }

  onCreated() {
    if (this.type === 'artist') {
      this.artist = new Artist();
    } else if (this.type === 'site') {
      this.site = new Site();
    } else if (this.type === 'event') {
      this.event = new Event();
    }
    this.getItems();
    this.view = '';
  }

  reloadItems() {
    this.bodyEvent.page = 1;
    this.getItems();
  }
}
