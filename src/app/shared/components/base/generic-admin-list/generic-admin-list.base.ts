import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { GetAllDto, PaginatorI } from '@interfaces';
import { Artist, Event, Media, Site, Youtube } from '@models';
import {
  ApiService,
  NavigationService,
  ScrapingService,
  StatsService,
  ToastService,
  TOAST_STATE,
} from '@services';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { EventGetAllDto } from '@shared/services/api/event/event.dto';
import { StatsGetTopStatsI } from '@shared/services/api/stats/stats.interface';
import { NgxSpinnerService } from '@shared/services/system/ngx-spinner/ngx-spinner.service';
import { GenericBodyType, GenericItemsType, GenericItemType, GenericSubItemType } from '@shared/utils';
import { Observable } from 'rxjs';

@Component({
  selector: 'generic-admin-list-base',
  templateUrl: 'generic-admin-list.base.html',
  animations: [inOutAnimation],
})
export class GenericAdminListBase {
  @Input() type!: GenericItemType;
  @Input() subType!: GenericSubItemType;
  typeItems!: GenericItemsType;
  typeBody!: GenericBodyType;
  typeTabs!: 'artistsAdmin' | 'eventsAdmin' | 'sitesAdmin' | 'mediaAdmin';
  title!: string;
  artists: Artist[] = [];
  sites: Site[] = [];
  events: Event[] = [];
  medias: Media[] = [];
  artist: Artist = new Artist();
  site: Site = new Site();
  event: Event = new Event();
  media: Media = new Media();
  stats: StatsGetTopStatsI = {
    topSocial: [],
    topCountries: [],
  };
  bodyArtist: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['updated', 'desc'],
  };
  bodySite: GetAllDto = {
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
    filter: [],
  };
  bodyMedia: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['updated', 'desc'],
    type: '',
  };
  view!: string;
  filter = false;
  loading = true;
  error = false;
  total = 0;
  itemsSearch: Youtube[] = [];
  mediaSource = 'youtube';
  searchText = '';
  scraping: any = {
    images: [],
    infos: [],
    styles: [],
  };
  scrapingItemSelected!: Youtube;
  constructor(
    private apiService: ApiService,
    private statsService: StatsService,
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private scrapingService: ScrapingService,
    private navigationService: NavigationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.type) {
      this.setTitle();
      this.setTypeTabs();
      this.getItems();
      this.getStats();
      if (this.type === 'media') {
        this.getSourceAndValueWithParams();
      }
    }
  }

  setTitle() {
    if (this.type === 'artist') {
      this.title = 'Artistas';
    } else if (this.type === 'site') {
      this.title = this.subType === 'club' ? 'Clubs' : 'Festivales';
    } else if (this.type === 'event') {
      this.title = 'Eventos';
    } else if (this.type === 'media') {
      this.title = this.subType === 'set' ? 'Sets' : 'Tracks';
    }
  }

  setTypeTabs() {
    if (this.type === 'artist') {
      this.typeTabs = 'artistsAdmin';
    } else if (this.type === 'event') {
      this.typeTabs = 'eventsAdmin';
    } else if (this.type === 'site') {
      this.typeTabs = 'sitesAdmin';
    } else if (this.type === 'media') {
      this.typeTabs = 'mediaAdmin';
    }
  }

  getItems(more = false) {
    let service: Observable<PaginatorI<any>>;
    if (this.type === 'site') {
      this.typeItems = 'sites';
      this.bodySite.type = this.subType;
      service = this.apiService.getAll<Site>(this.typeItems, this.bodySite);
      this.typeBody = 'bodySite';
    } else if (this.type === 'event') {
      this.typeItems = 'events';
      this.typeBody = 'bodyEvent';
      service = this.apiService.getAll<Event>(this.typeItems, this.bodyEvent);
    } else if (this.type === 'media') {
      this.bodyMedia.type = this.subType;
      this.typeItems = 'medias';
      this.typeBody = 'bodyMedia';
      service = this.apiService.getAll<Media>('media', this.bodyMedia);
    } else {
      this.typeItems = 'artists';
      this.typeBody = 'bodyArtist';
      service = this.apiService.getAll<Artist>(this.typeItems, this.bodyArtist);
    }

    service.subscribe({
      next: (response) => {
        if (!more) {
          this[this.typeItems] = response.items;
          this.total = response.paginator.total;
        } else {
          let data: any[] = this[this.typeItems];
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
    if (this.type !== 'media') {
      let type = '';

      if (this.type === 'artist') {
        type = 'artist';
      } else if (this.type === 'event') {
        type = 'event';
      } else if (this.subType === 'club') {
        type = 'club';
      } else if (this.subType === 'festival') {
        type = 'festival';
      }
      this.statsService.getTopStats({ type: type, limit: 10 }).subscribe({
        next: (response) => {
          this.stats = response;
        },
        error: (error) => this.toast.showToast(TOAST_STATE.error, error),
      });
    }
  }

  getSourceAndValueWithParams() {
    const source = this.route.snapshot.queryParams['source'];
    const value = this.route.snapshot.queryParams['value'];
    if (source && value) {
      this.mediaSource = source === 'default' ? 'youtube' : source;
      this.searchText = value;
    }
  }

  goToPage(data: GoToPageI) {
    if (data.admin === undefined) {
      data.admin = true;
    }
    if (!data.type) {
      if (this.type === 'artist' || this.type === 'event') {
        data.type = this.type;
      } else if (this.type === 'site') {
        data.type = this.subType;
      } else if (this.type === 'media') {
        data.type = this.subType;
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
    } else if (this.type === 'media') {
      this.media = new Media();
    }
    this.getItems();
    this.onClickTab({ name: 'Listado', action: 'viewList' });
  }

  reloadItems() {
    this.bodyEvent.page = 1;
    this.getItems();
  }

  searchAdd(searchText: string) {
    if (this.mediaSource === 'youtube') {
      this.spinner.show();
      this.scrapingService
        .getListMedia({
          query: searchText,
          maxResults: '20',
          source: this.mediaSource,
        })
        .subscribe({
          next: (response) => {
            this.itemsSearch = response;
            this.spinner.hide();
          },
          error: (error) => {
            this.spinner.hide();
            this.toast.showToast(TOAST_STATE.error, error);
          },
        });
    } else {
      this.toast.showToast(TOAST_STATE.warning, 'En construccion');
    }
  }

  selectItem(item: Youtube) {
    this.scrapingItemSelected = item;
    this.media = new Media({
      name: item.name,
      type: this.bodyMedia.type === 'set' ? 'set' : 'track',
      source: this.mediaSource,
      sourceId: item.videoId,
      info: item.info,
    });
    this.scraping.images = [item.image];
  }
}
