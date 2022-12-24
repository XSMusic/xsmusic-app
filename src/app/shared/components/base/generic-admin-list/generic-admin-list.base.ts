import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { PaginatorI } from '@interfaces';
import { Artist, Event, Media, Site, Youtube } from '@models';
import {
  ApiService,
  ScrapingService,
  StatsService,
  UIService,
} from '@services';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { GenericItemType, GenericSubItemType } from '@shared/utils';
import { Observable } from 'rxjs';
import { GenericAdminListBaseViewModel } from './generic-admin-list.base.view-model';

@Component({
  selector: 'generic-admin-list-base',
  templateUrl: 'generic-admin-list.base.html',
  animations: [inOutAnimation],
})
export class GenericAdminListBase {
  @Input() type!: GenericItemType;
  @Input() subType!: GenericSubItemType;
  vm = new GenericAdminListBaseViewModel();
  constructor(
    private apiService: ApiService,
    private statsService: StatsService,
    private scrapingService: ScrapingService,
    private ui: UIService,
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
      this.vm.title = 'Artistas';
    } else if (this.type === 'site') {
      this.vm.title = this.subType === 'club' ? 'Clubs' : 'Festivales';
    } else if (this.type === 'event') {
      this.vm.title = 'Eventos';
    } else if (this.type === 'media') {
      this.vm.title = this.subType === 'set' ? 'Sets' : 'Tracks';
    }
  }

  setTypeTabs() {
    if (this.type === 'artist') {
      this.vm.typeTabs = 'artistsAdmin';
    } else if (this.type === 'event') {
      this.vm.typeTabs = 'eventsAdmin';
    } else if (this.type === 'site') {
      this.vm.typeTabs = 'sitesAdmin';
    } else if (this.type === 'media') {
      this.vm.typeTabs = 'mediaAdmin';
    }
  }

  getItems(more = false) {
    let service: Observable<PaginatorI<any>>;
    if (this.type === 'site') {
      this.vm.typeItems = 'sites';
      this.vm.bodySite.type = this.subType;
      service = this.apiService.getAll<Site>(
        this.vm.typeItems,
        this.vm.bodySite
      );
      this.vm.typeBody = 'bodySite';
    } else if (this.type === 'event') {
      this.vm.typeItems = 'events';
      this.vm.typeBody = 'bodyEvent';
      service = this.apiService.getAll<Event>(
        this.vm.typeItems,
        this.vm.bodyEvent
      );
    } else if (this.type === 'media') {
      this.vm.bodyMedia.type = this.subType;
      this.vm.typeItems = 'medias';
      this.vm.typeBody = 'bodyMedia';
      service = this.apiService.getAll<Media>('media', this.vm.bodyMedia);
    } else {
      this.vm.typeItems = 'artists';
      this.vm.typeBody = 'bodyArtist';
      service = this.apiService.getAll<Artist>(
        this.vm.typeItems,
        this.vm.bodyArtist
      );
    }

    service.subscribe({
      next: (response) => {
        if (!more) {
          this.vm[this.vm.typeItems] = response.items;
          this.vm.total = response.paginator.total;
        } else {
          let data: any[] = this.vm[this.vm.typeItems];
          data = data.concat(response.items);
          this.vm[this.vm.typeItems] = data;
        }
        this.vm.loading = false;
        this.vm.error = false;
      },
      error: () => {
        this.vm.loading = false;
        this.vm.error = true;
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
          this.vm.stats = response;
        },
        error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
      });
    }
  }

  getSourceAndValueWithParams() {
    const source = this.route.snapshot.queryParams['source'];
    const value = this.route.snapshot.queryParams['value'];
    if (source && value) {
      this.vm.mediaSource = source === 'default' ? 'youtube' : source;
      this.vm.searchText = value;
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
    this.ui.navigation.goToPage(data);
  }

  onFilter(event: { name: string; value: string }) {
    this.vm[this.vm.typeBody].page = 1;
    this.vm[this.vm.typeBody].filter = [event.name, event.value];
    this.vm.filter = true;
    this.getItems();
  }

  removeFilter() {
    this.vm[this.vm.typeBody].page = 1;
    this.vm[this.vm.typeBody].filter = [];
    this.vm.filter = false;
    this.getItems();
  }

  onScroll() {
    this.vm[this.vm.typeBody].page!++;
    this.getItems(true);
  }

  onClickTab(tab: TabsItem) {
    if (tab.action.includes('view')) {
      this.vm.view = tab.action;
    } else if (tab.action === 'order') {
      this.ui.toast.showToast(TOAST_STATE.info, 'En construccion');
    }
  }

  onSearch(event: { text: string; type: string }) {
    if (event.text === '') {
      this.vm[this.vm.typeBody].page = 1;
      this.getItems();
      this.vm.filter = false;
    } else {
      this.vm[this.vm.typeBody].page = 1;
      this.vm[this.vm.typeBody].filter = ['name', event.text];
      this.vm.filter = true;
      this.getItems();
    }
  }

  onCreated() {
    if (this.type === 'artist') {
      this.vm.artist = new Artist();
    } else if (this.type === 'site') {
      this.vm.site = new Site();
    } else if (this.type === 'event') {
      this.vm.event = new Event();
    } else if (this.type === 'media') {
      this.vm.media = new Media();
    }
    this.getItems();
    this.onClickTab({ name: 'Listado', action: 'viewList' });
  }

  reloadItems() {
    this.vm.bodyEvent.page = 1;
    this.getItems();
  }

  searchAdd(searchText: string) {
    if (this.vm.mediaSource === 'youtube') {
      this.ui.spinner.show();
      this.scrapingService
        .getListMedia({
          query: searchText,
          maxResults: '20',
          source: this.vm.mediaSource,
        })
        .subscribe({
          next: (response) => {
            this.vm.itemsSearch = response;
            this.ui.spinner.hide();
          },
          error: (error) => {
            this.ui.spinner.hide();
            this.ui.toast.showToast(TOAST_STATE.error, error);
          },
        });
    } else {
      this.ui.toast.showToast(TOAST_STATE.warning, 'En construccion');
    }
  }

  selectItem(item: Youtube) {
    this.vm.scrapingItemSelected = item;
    this.vm.media = new Media({
      name: item.name,
      type: this.vm.bodyMedia.type === 'set' ? 'set' : 'track',
      source: this.vm.mediaSource,
      sourceId: item.videoId,
      info: item.info,
    });
    this.vm.scraping.images = [item.image];
  }
}
