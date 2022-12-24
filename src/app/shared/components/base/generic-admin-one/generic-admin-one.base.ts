import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import {
  ApiService,
  EventService,
  MediaService,
  UIService,
} from '@services';
import { routesConfig } from '@core/config';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { OptionsItemI } from '@shared/components/ui/options-items/options-items.interface';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';
import { DateFunctions } from '@shared/utils/dates';
import { MetadataI } from '@shared/services/system/meta';
import { ApiTypes, GenericItemType, GenericSubItemType } from '@shared/utils';
import { GenericAdminOneBaseViewModel } from './generic-admin-one.base.view-model';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { GetOneDto } from '@shared/services/api/api.dtos';

@Component({
  selector: 'generic-admin-one-base',
  templateUrl: './generic-admin-one.base.html',
  animations: [inOutAnimation],
})
export class GenericAdminOneBase implements OnInit {
  @Input() type!: GenericItemType;
  @Input() subType!: GenericSubItemType;
  vm = new GenericAdminOneBaseViewModel();

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private mediaService: MediaService,
    private eventService: EventService,
    private router: Router,
    private ui: UIService
  ) {}

  ngOnInit() {
    this.ui.spinner.show();
    this.vm.id = this.route.snapshot.paramMap.get('id')!;
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
      this.vm.bodyEvents.type = `${this.type}s`;
      this.vm.bodyMediaSet.type = `${this.type}s`;
      this.vm.bodyMediaTrack.type = `${this.type}s`;
    } else if (this.type === 'site') {
      this.vm.bodyEvents.type = `${this.type}`;
      this.vm.bodyMediaSet.type = `${this.type}`;
      this.vm.bodyMediaTrack.type = `${this.subType}s`;
    }
  }

  setTitle() {
    switch (this.type) {
      case 'artist':
        this.vm.title = `${this.vm.id ? 'Editar' : 'Nuevo'} Artista`;
        break;
      case 'site':
        const titleSite = this.subType === 'club' ? 'Clubs' : 'Festivales';
        this.vm.title = `${this.vm.id ? 'Editar' : 'Nuevo'} ${titleSite}`;
        break;
      case 'site':
        this.vm.title = `${this.vm.id ? 'Editar' : 'Nuevo'} Eventos`;
        break;
      case 'media':
        const titleMedia = this.subType === 'set' ? 'Sets' : 'Tracks';
        this.vm.title = `${this.vm.id ? 'Editar' : 'Nuevo'} ${titleMedia}`;
        break;
      default:
        break;
    }
  }

  setTypeTabs() {
    if (this.type === 'artist') {
      this.vm.typeTabs = 'artistAdmin';
    } else if (this.type === 'event') {
      this.vm.typeTabs = 'eventAdmin';
    } else if (this.type === 'site') {
      this.vm.typeTabs = 'siteAdmin';
    } else if (this.type === 'media') {
      this.vm.typeTabs = 'mediaAdmin';
    }
  }

  setOptions() {
    if (this.type === 'artist') {
      this.vm.options.push(
        { name: 'Añadir Set', action: 'goToAdminSetAdd' },
        { name: 'Añadir Track', action: 'goToAdminTrackAdd' }
      );
    } else if (this.type === 'site') {
      this.vm.options.push(
        { name: 'Añadir Set', action: 'goToAdminSetAdd' },
        { name: 'Añadir Evento', action: 'goToAdminEventAdd' }
      );
    }
  }

  getItem() {
    const data: GetOneDto = {
      type: 'id',
      value: this.vm.id,
      admin: true,
    };
    let type!: ApiTypes;
    if (this.type !== 'media') {
      type = `${this.type}s`;
    } else {
      type = this.type;
    }
    this.apiService.getOne<any>(type, data).subscribe({
      next: (response: any) => {
        this.vm[this.type] = response;
        this.setMeta();
        this.checkViews();
        this.ui.spinner.hide();
      },
      error: () => {
        this.ui.spinner.hide();
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
      title = `${this.vm.event.name} @ ${
        this.vm.event.site.name
      } - ${DateFunctions.new(this.vm.event.date).format('DD-MM-YYYY')}`;
    } else {
      title = this.vm[this.type].name!;
    }
    const meta: MetadataI = {
      title: title,
    };
    this.ui.meta.setMetaDynamic(meta);
  }

  checkViews() {
    if (this.type === 'artist') {
      this.checkViewsArtist();
    } else if (this.type === 'site') {
      this.checkViewsSite();
    }
  }

  checkViewsArtist() {
    if (this.vm.artist.sets && this.vm.artist.sets.count > 0) {
      this.getMediaSets();
    }
    if (this.vm.artist.tracks && this.vm.artist.tracks.count > 0) {
      this.getMediaTracks();
    }
    if (this.vm.artist.events && this.vm.artist.events.count > 0) {
      this.getEvents();
    }
  }

  checkViewsSite() {
    if (this.vm.site.sets && this.vm.site.sets.count > 0) {
      this.getMediaSets();
    }
    if (this.vm.site.events && this.vm.site.events.count > 0) {
      this.getEvents();
    }
  }

  getEvents() {
    this.vm.bodyEvents.id = this.vm[this.type]._id!;
    this.eventService.getAllForType(this.vm.bodyEvents).subscribe({
      next: (response) => (this.vm.events = response.items),
      error: (err) => {
        this.vm.views = this.vm.views.filter((item) => item.name !== 'Eventos');
        this.ui.toast.showToast(TOAST_STATE.error, err);
      },
    });
  }

  getMediaSets() {
    this.vm.bodyMediaSet.id = this.vm[this.type]._id!;
    this.mediaService.getAllForType(this.vm.bodyMediaSet).subscribe({
      next: (response) => (this.vm.sets = response.items),
      error: (err) => {
        this.vm.views = this.vm.views.filter((item) => item.name !== 'Sets');
        this.ui.toast.showToast(TOAST_STATE.error, err);
      },
    });
  }

  getMediaTracks() {
    this.vm.bodyMediaTrack.id = this.vm[this.type]._id!;
    this.mediaService.getAllForType(this.vm.bodyMediaTrack).subscribe({
      next: (response) => (this.vm.tracks = response.items),
      error: (err) => {
        this.vm.views = this.vm.views.filter((item) => item.name !== 'Sets');
        this.ui.toast.showToast(TOAST_STATE.error, err);
      },
    });
  }

  goToPage(data: GoToPageI) {
    data.admin = true;
    this.ui.navigation.goToPage(data);
  }

  onClickTab(tab: TabsItem) {
    this.vm.view = tab.action;
  }

  onClickOptionItem(event: OptionsItemI) {
    if (event.action === 'goToAdminSetAdd') {
      this.router.navigate([routesConfig.setsAdmin], {
        queryParams: {
          tab: 'viewAdd',
          source: 'default',
          value: this.vm.artist.name,
        },
      });
    } else if (event.action === 'goToAdminTrackAdd') {
      this.router.navigate([routesConfig.tracksAdmin], {
        queryParams: {
          tab: 'viewAdd',
          source: 'default',
          value: this.vm.artist.name,
        },
      });
    }
  }
}
