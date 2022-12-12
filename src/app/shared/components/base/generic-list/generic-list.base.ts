import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { GetAllDto, FilterListI } from '@interfaces';
import { Artist, Event, Media, Site } from '@models';
import {
  ArtistService,
  ToastService,
  NavigationService,
  TOAST_STATE,
  EventService,
  MediaService,
  SiteService,
} from '@services';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { EventGetAllDto } from '@shared/services/api/event/event.dto';
import { SiteGetAllDto } from '@shared/services/api/site/site.dto';
import { getFilterList, getUserLocation } from '@shared/utils';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Observable } from 'rxjs';

@Component({
  selector: 'generic-list-base',
  templateUrl: 'generic-list.base.html',
  animations: [inOutAnimation],
})
export class GenericListBase {
  @Input() type!: 'artist' | 'event' | 'media' | 'site';
  @Input() subType!: 'club' | 'festival' | 'set' | 'track';
  typeItems!: 'artists' | 'sites' | 'events' | 'medias';
  typeBody!: 'bodyArtist' | 'bodySite' | 'bodyEvent' | 'bodyMedia';
  typeTabs!: 'artists' | 'events' | 'sites' | 'media';
  title!: string;
  artists: Artist[] = [];
  sites: Site[] = [];
  events: Event[] = [];
  medias: Media[] = [];
  sitesMap: Site[] = [];
  view = 'gallery';
  service!: Observable<any>;
  bodyArtist: GetAllDto = {
    page: 1,
    pageSize: 30,
    order: ['created', 'desc'],
  };
  bodyEvent: EventGetAllDto = {
    page: 1,
    pageSize: 30,
    order: ['date', 'asc'],
  };
  bodySite: SiteGetAllDto = {
    page: 1,
    pageSize: 30,
    order: ['created', 'desc'],
    type: 'club',
    map: false,
  };
  bodySiteMap: SiteGetAllDto = {
    page: 1,
    pageSize: 1000,
    order: ['created', 'desc'],
    type: 'club',
    map: true,
    maxDistance: 1000,
  };
  bodyMedia: GetAllDto = {
    page: 1,
    pageSize: 30,
    order: ['updated', 'desc'],
    type: '',
  };
  filter = false;
  filterData!: FilterListI;
  loading = true;
  error = false;
  total = 0;
  typeForGalleryView!:
    | 'artist'
    | 'club'
    | 'event'
    | 'eventScraping'
    | 'set'
    | 'track'
    | 'festival';
  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private siteService: SiteService,
    private eventService: EventService,
    private mediaService: MediaService,
    private toast: ToastService,
    private gaService: GoogleAnalyticsService,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    if (this.type) {
      this.setTitle();
      this.setTypeTabs();
      this.setTypeForGalleryView();
      this.setServicesAndTypes();
      this.getFilter();
      this.getItems();
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
      this.typeTabs = 'artists';
    } else if (this.type === 'event') {
      this.typeTabs = 'events';
    } else if (this.type === 'site') {
      this.typeTabs = 'sites';
    } else if (this.type === 'media') {
      this.typeTabs = 'media';
    }
  }

  getFilter() {
    this.filterData = getFilterList(this.route);
    if (this.filterData) {
      this[this.typeBody].filter = this.filterData.data;
      if (this.filterData.data[0] !== undefined) {
        this.filter = true;
      }
    }
  }

  setTypeForGalleryView() {
    if (this.type === 'site' || this.type === 'media') {
      this.typeForGalleryView = this.subType;
    } else {
      this.typeForGalleryView = this.type;
    }
  }

  setServicesAndTypes() {
    if (this.type === 'site') {
      this.bodySite.type = this.subType;
      this.service = this.siteService.getAll(this.bodySite);
      this.typeItems = 'sites';
      this.typeBody = 'bodySite';
      this.getItemsMap();
    } else if (this.type === 'event') {
      this.service = this.eventService.getAll(this.bodyEvent);
      this.typeItems = 'events';
      this.typeBody = 'bodyEvent';
    } else if (this.type === 'media') {
      this.bodyMedia.type = this.subType;
      this.service = this.mediaService.getAll(this.bodyMedia);
      this.typeItems = 'medias';
      this.typeBody = 'bodyMedia';
    } else {
      this.service = this.artistService.getAll(this.bodyArtist);
      this.typeItems = 'artists';
      this.typeBody = 'bodyArtist';
    }
  }

  getItems(more = false) {
    this.service.subscribe({
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
      error: (error) => {
        this.loading = false;
        this.error = true;
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  async getItemsMap() {
    const userCoordinates = await getUserLocation();
    this.bodySiteMap.coordinates = userCoordinates;
    this.bodySiteMap.type = this.subType;
    this.siteService.getAll(this.bodySiteMap).subscribe({
      next: (response) => {
        this.sitesMap = response.items;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  goToPage(data: GoToPageI) {
    this.gaService.event('artists_link_profile', 'artists_link', 'artists');
    this.navigationService.goToPage(data);
  }

  onFilter(event: { name: string; value: string }) {
    this[this.typeBody].page = 1;
    this[this.typeBody].filter = [event.name, event.value];
    this.filter = true;
    this.getItems();
  }

  removeFilter() {
    this.gaService.event(
      `${this.type}s_remove_filter`,
      `${this.type}s_filter`,
      `${this.type}s`
    );
    this[this.typeBody].page = 1;
    this[this.typeBody].filter = [];
    this.filter = false;
    this.getItems();
  }

  onScroll() {
    this[this.typeBody].page++;
    this.getItems(true);
  }

  onClickTab(button: TabsItem) {
    if (button.action.includes('view')) {
      this.view = button.action;
      this.gaService.event(
        `${this.type}s_change_${button.action}`,
        `${this.type}s_filter`,
        `${this.type}s`
      );
    } else {
      this.toast.showToast(TOAST_STATE.info, 'En construccion');
    }
  }

  onSearch(event: { text: string; type: string }) {
    if (event.text === '') {
      this.gaService.event(
        `${this.type}s_search_empty`,
        `${this.type}s_search`,
        `${this.type}s`
      );
      this[this.typeBody].page = 1;
      this.getItems();
      this.filter = false;
    } else {
      this.gaService.event(
        `${this.type}s_search_${event.text}}`,
        `${this.type}s_search`,
        `${this.type}s`
      );
      this[this.typeBody].page = 1;
      this[this.typeBody].filter = ['name', event.text];
      this.filter = true;
      this.getItems();
    }
  }
}
