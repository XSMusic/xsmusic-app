import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import {
  ToastService,
  NavigationService,
  TOAST_STATE,
  SiteService,
  ApiService,
} from '@services';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import {
  GenericSubItemType,
  getFilterList,
  getUserLocation,
} from '@shared/utils';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { GenericListBaseViewModel } from './generic-list.base.view-model';

@Component({
  selector: 'generic-list-base',
  templateUrl: 'generic-list.base.html',
  animations: [inOutAnimation],
})
export class GenericListBase {
  @Input() type!: 'artist' | 'event' | 'media' | 'site' | any;
  @Input() subType!: GenericSubItemType;
  vm = new GenericListBaseViewModel();
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private siteService: SiteService,
    private toast: ToastService,
    private gaService: GoogleAnalyticsService,
    private navigationService: NavigationService
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
    } else {
      this.vm.typeForGalleryView = this.type;
    }
  }

  getItems(more = false) {
    if (this.vm.service) {
      this.vm.service.subscribe({
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
        error: (error) => {
          this.vm.loading = false;
          this.vm.error = true;
          this.toast.showToast(TOAST_STATE.error, error);
        },
      });
    }
  }

  async getItemsMap() {
    const userCoordinates = await getUserLocation();
    this.vm.bodySiteMap.coordinates = userCoordinates;
    this.vm.bodySiteMap.type = this.subType;
    this.siteService.getAll(this.vm.bodySiteMap).subscribe({
      next: (response) => {
        this.vm.sitesMap = response.items;
        this.vm.loading = false;
      },
      error: () => {
        this.vm.loading = false;
        this.vm.error = true;
      },
    });
  }

  goToPage(data: GoToPageI) {
    this.gaService.event('artists_link_profile', 'artists_link', 'artists');
    this.navigationService.goToPage(data);
  }

  onFilter(event: { name: string; value: string }) {
    this.vm[this.vm.typeBody].page = 1;
    this.vm[this.vm.typeBody].filter = [event.name, event.value];
    this.vm.filter = true;
    this.getItems();
  }

  removeFilter() {
    this.gaService.event(
      `${this.type}s_remove_filter`,
      `${this.type}s_filter`,
      `${this.type}s`
    );
    this.vm[this.vm.typeBody].page = 1;
    this.vm[this.vm.typeBody].filter = [];
    this.vm.filter = false;
    this.getItems();
  }

  onScroll() {
    this.vm[this.vm.typeBody].page!++;
    this.getItems(true);
  }

  onClickTab(button: TabsItem) {
    if (button.action.includes('view')) {
      this.vm.view = button.action;
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
      this.vm[this.vm.typeBody].page = 1;
      this.getItems();
      this.vm.filter = false;
    } else {
      this.gaService.event(
        `${this.type}s_search_${event.text}}`,
        `${this.type}s_search`,
        `${this.type}s`
      );
      this.vm[this.vm.typeBody].page = 1;
      this.vm[this.vm.typeBody].filter = ['name', event.text];
      this.vm.filter = true;
      this.getItems();
    }
  }
}
