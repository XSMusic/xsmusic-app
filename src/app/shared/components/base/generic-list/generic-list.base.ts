import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Image, Like, Site } from '@models';
import { ApiService, UIService } from '@services';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { GA } from '@shared/services/ui/google-analytics/ga.model';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import {
  ApiTypes,
  GenericItemType,
  GenericSubItemType,
  getFilterList,
  getUserLocation,
} from '@shared/utils';
import { GenericListBaseViewModel } from './generic-list.base.view-model';

@Component({
  selector: 'generic-list-base',
  templateUrl: 'generic-list.base.html',
  animations: [inOutAnimation],
})
export class GenericListBase {
  @Input() type!: GenericItemType;
  @Input() subType!: GenericSubItemType;
  vm = new GenericListBaseViewModel();
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private ui: UIService
  ) {}

  ngOnInit() {
    if (this.type) {
      this.setDataByTypes();
      this.setTypeForGalleryView();
      this.getFilter();
      this.getItems();
    }
  }

  setDataByTypes() {
    if (this.type === 'artist') {
      this.vm.title = 'Artistas';
      this.vm.typeTabs = 'artists';
      this.vm.typeAdminRoute = 'artist';
      this.vm.service = this.apiService.getAll('artists', this.vm.bodyArtist);
      this.vm.typeItems = 'artists';
      this.vm.typeBody = 'bodyArtist';
    } else if (this.type === 'event') {
      this.vm.title = 'Eventos';
      this.vm.typeTabs = 'events';
      this.vm.typeAdminRoute = 'event';
      this.vm.service = this.apiService.getAll('events', this.vm.bodyEvent);
      this.vm.typeItems = 'events';
      this.vm.typeBody = 'bodyEvent';
    } else if (this.type === 'media') {
      this.vm.title = this.subType === 'set' ? 'Sets' : 'Tracks';
      this.vm.typeTabs = 'media';
      this.vm.typeAdminRoute = this.subType === 'set' ? 'set' : 'track';
      this.vm.bodyMedia.type = this.subType;
      this.vm.service = this.apiService.getAll('media', this.vm.bodyMedia);
      this.vm.typeItems = 'medias';
      this.vm.typeBody = 'bodyMedia';
    } else if (this.type === 'site') {
      this.vm.title = this.subType === 'club' ? 'Clubs' : 'Festivales';
      this.vm.typeTabs = 'sites';
      this.vm.typeAdminRoute = this.subType === 'club' ? 'club' : 'festival';
      this.vm.bodySite.type = this.subType;
      this.vm.service = this.apiService.getAll('sites', this.vm.bodySite);
      this.vm.typeItems = 'sites';
      this.vm.typeBody = 'bodySite';
      this.getItemsMap();
    }
  }

  getFilter() {
    this.vm.filterData = getFilterList(this.route);
    if (this.vm.filterData) {
      this.vm[this.vm.typeBody].filter = this.vm.filterData.data;
      if (this.vm.filterData.data[0] !== undefined) {
        this.vm.filter = true;
      }
    }
  }

  setTypeForGalleryView() {
    if (this.type === 'site' || this.type === 'media') {
      this.vm.typeForGalleryView = this.subType;
    } else if (
      this.type !== 'image' &&
      this.type !== 'like' &&
      this.type !== 'style' &&
      this.type !== 'user'
    ) {
      this.vm.typeForGalleryView = this.type;
    }
  }

  getItems(more = false) {
    if (this.vm.service) {
      this.vm.service.subscribe({
        next: (response: any[]) => {
          if (!more) {
            this.vm[this.vm.typeItems] = response;
          } else {
            let data: any[] = this.vm[this.vm.typeItems];
            data = data.concat(response);
            this.vm[this.vm.typeItems] = data;
          }
          this.vm.loading = false;
          this.vm.error = false;
        },
        error: (error) => {
          this.vm.loading = false;
          this.vm.error = true;
          this.ui.toast.showToast(TOAST_STATE.error, error);
        },
      });
    }
  }

  async getItemsMap() {
    const userCoordinates = await getUserLocation();
    this.vm.bodySiteMap.coordinates = userCoordinates;
    this.vm.bodySiteMap.type = this.subType;
    this.vm.bodySiteMap.maxDistance = this.subType === 'club' ? 600 : 10000;
    this.apiService.getAll<Site>('sites', this.vm.bodySiteMap).subscribe({
      next: (response) => {
        this.vm.sitesMap = response;
      },
      error: () => {
        this.vm.loading = false;
        this.vm.error = true;
      },
    });
  }

  goToPage(data: GoToPageI) {
    this.sendEvent('link_profile');
    this.ui.navigation.goToPage(data);
  }

  onFilter(event: { name: string; value: string }) {
    this.vm[this.vm.typeBody].page = 1;
    this.vm[this.vm.typeBody].filter = [event.name, event.value];
    this.vm.filter = true;
    this.getItems();
  }

  removeFilter() {
    this.sendEvent('remove_filter');
    this.vm[this.vm.typeBody].page = 1;
    this.vm[this.vm.typeBody].filter = [];
    this.vm.filter = false;
    this.getItems();
  }

  onScroll() {
    this.vm[this.vm.typeBody].page!++;
    this.getItems(true);
  }

  onClickTab(data: { tab: TabsItem; first: boolean }) {
    if (data.tab.action.includes('view')) {
      this.vm.view = data.tab.action;
      if (!data.first) {
        this.sendEvent(`change_${data.tab.action}`);
      }
    } else {
      this.ui.toast.showToast(TOAST_STATE.info, 'En construccion');
    }
  }

  onSearch(event: { text: string; type: string }) {
    if (event.text === '') {
      this.sendEvent('search_empty');
      this.vm[this.vm.typeBody].page = 1;
      this.getItems();
      this.vm.filter = false;
    } else {
      this.sendEvent(`search_${event.text}`);
      this.vm[this.vm.typeBody].page = 1;
      this.vm[this.vm.typeBody].filter = ['name', event.text];
      this.vm.filter = true;
      this.getItems();
    }
  }

  showImage(image: Image) {
    this.ui.fullImage.show({ image });
  }

  likeOrDislike(event: { type: ApiTypes; like: Like }, items: any[]) {
    console.log(event.like[event.like.type]);
    this.apiService.create(event.type, event.like).subscribe({
      next: () =>
        items.forEach((i) => {
          if (i._id === event.like[event.like.type]) {
            i.userLike = !i.userLike;
            this.sendEvent(i.userLike === true ? 'like' : 'dislike');
          }
          return i;
        }),
      error: () =>
        this.ui.toast.showToast(TOAST_STATE.error, 'Error al dar Like'),
    });
  }

  sendEvent(event: string) {
    const gaEvent = new GA({
      event,
      one: false,
      type:
        this.type !== 'media' && this.type !== 'site'
          ? this.type
          : this.subType,
    });
    this.ui.ga2.event(gaEvent);
  }
}
