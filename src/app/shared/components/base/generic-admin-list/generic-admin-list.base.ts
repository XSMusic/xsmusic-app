import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { ShowImageI } from '@interfaces';
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
import { BaseHelper } from '../base.helper';
import { GenericAdminListBaseViewModel } from './generic-admin-list.base.view-model';

@Component({
  selector: 'generic-admin-list-base',
  templateUrl: 'generic-admin-list.base.html',
  animations: [inOutAnimation],
  providers: [BaseHelper],
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
    private route: ActivatedRoute,
    private baseHelper: BaseHelper
  ) {}

  ngOnInit() {
    if (this.type) {
      this.setDataByTypes();
      this.getItems();
      this.getStats();
      if (this.type === 'media') {
        this.getSourceAndValueWithParams();
      }
    }
  }

  setDataByTypes() {
    if (this.type === 'artist') {
      this.vm.title = 'Artistas';
      this.vm.typeTabs = 'artistsAdmin';
      this.vm.typeItems = 'artists';
      this.vm.typeBody = 'bodyArtist';
      this.vm.apiType = 'artists';
    } else if (this.type === 'event') {
      this.vm.title = 'Eventos';
      this.vm.typeTabs = 'eventsAdmin';
      this.vm.typeItems = 'events';
      this.vm.typeBody = 'bodyEvent';
      this.vm.apiType = 'events';
    } else if (this.type === 'media') {
      this.vm.title = this.subType === 'set' ? 'Sets' : 'Tracks';
      this.vm.typeTabs = 'mediaAdmin';
      this.vm.bodyMedia.type = this.subType;
      this.vm.typeItems = 'medias';
      this.vm.typeBody = 'bodyMedia';
      this.vm.apiType = 'media';
    } else if (this.type === 'site') {
      this.vm.title = this.subType === 'club' ? 'Clubs' : 'Festivales';
      this.vm.typeTabs = 'sitesAdmin';
      this.vm.typeItems = 'sites';
      this.vm.typeBody = 'bodySite';
      this.vm.bodySite.type = this.subType;
      this.vm.apiType = 'sites';
    } else if (this.type === 'style') {
      this.vm.title = 'Estilos';
      this.vm.typeTabs = 'stylesAdmin';
      this.vm.typeItems = 'styles';
      this.vm.typeBody = 'bodyStyle';
      this.vm.apiType = 'styles';
    } else if (this.type === 'user') {
      this.vm.title = 'Usuarios';
      this.vm.typeTabs = 'usersAdmin';
      this.vm.typeItems = 'users';
      this.vm.typeBody = 'bodyUser';
      this.vm.apiType = 'users';
    }
  }

  getItems(more = false) {
    this.apiService
      .getAll<any>(this.vm.apiType, this.vm[this.vm.typeBody])
      .subscribe({
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
    if (
      this.type !== 'media' &&
      this.type !== 'style' &&
      this.type !== 'user'
    ) {
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
    this.vm[this.vm.typeBody].page = 1;
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

  onSubmit() {
    this.baseHelper.onSubmit(
      this.vm.apiType,
      this.type,
      this.subType,
      this.vm[this.type],
      this.vm.scraping
    );
  }

  uploadImageByFile(image: File) {
    this.baseHelper.uploadImageByFile(this.vm[this.type], this.type, image);
  }

  uploadImageByUrl(image: string) {
    this.baseHelper.uploadImageByUrl(
      this.vm[this.type],
      this.type,
      this.vm.scraping,
      image
    );
  }

  showImage(data: ShowImageI) {
    this.ui.fullImage.show(data.image, data.remote);
  }
}
