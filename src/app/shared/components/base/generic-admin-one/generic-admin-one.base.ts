import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { ApiService, ImageService, UIService } from '@services';
import { routesConfig } from '@core/config';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { OptionsItemI } from '@shared/components/ui/options-items/options-items.interface';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';
import { DateFunctions } from '@shared/utils/dates';
import { MetadataI } from '@shared/services/system/meta';
import { GenericItemType, GoToType } from '@shared/utils';
import { GenericAdminOneBaseViewModel } from './generic-admin-one.base.view-model';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { GetOneDto } from '@shared/services/api/api.dtos';
import { Event, Image, Media } from '@models';
import { MessageI, ShowImageI } from '@interfaces';
import { ImageSetFirstImageDto } from '@shared/services/api/image/image.dto';
import { BaseHelper } from '../base.helper';

@Component({
  selector: 'generic-admin-one-base',
  templateUrl: './generic-admin-one.base.html',
  animations: [inOutAnimation],
  providers: [BaseHelper],
})
export class GenericAdminOneBase implements OnInit {
  @Input() type!: GenericItemType;
  vm = new GenericAdminOneBaseViewModel();

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private imageService: ImageService,
    private router: Router,
    private ui: UIService,
    private baseHelper: BaseHelper
  ) {}

  ngOnInit() {
    this.ui.spinner.show();
    this.vm.id = this.route.snapshot.paramMap.get('id')!;
    if (this.type) {
      this.setDataByTypes();
      this.getItem();
    }
  }

  private setDataByTypes() {
    this.setTypesArtist();
    this.setTypesMedia();
    this.setTypesEvent();
    this.setTypesSite();
    this.setTypesStyle();
    this.setTypesUser();
  }

  private setTypesUser() {
    if (this.type === 'user') {
      this.vm.apiType = `${this.type}s`;
      this.vm.typeTabs = 'userAdmin';
      this.vm.title = `${this.vm.id ? 'Editar' : 'Nuevo'} Usuario`;
    }
  }

  private setTypesStyle() {
    if (this.type === 'style') {
      this.vm.apiType = `${this.type}s`;
      this.vm.typeTabs = 'styleAdmin';
      this.vm.title = `${this.vm.id ? 'Editar' : 'Nuevo'} Estilo`;
    }
  }

  private setTypesSite() {
    if (this.type === 'site') {
      this.vm.bodyEvents.type = `${this.type}`;
      this.vm.bodyMediaSet.type = `${this.type}`;
      this.vm.subType = this.route.snapshot.routeConfig!.path!.includes('clubs')
        ? 'club'
        : 'festival';
      this.vm.bodyMediaTrack.type = `${this.vm.subType}s`;
      this.vm.apiType = `${this.type}s`;
      this.vm.typeTabs = 'siteAdmin';
      this.setTitleSub();
      this.vm.options.push(
        { name: 'Añadir Set', action: 'goToAdminSetAdd' },
        { name: 'Añadir Evento', action: 'goToAdminEventAdd' }
      );
    }
  }

  private setTypesEvent() {
    if (this.type === 'event') {
      this.vm.apiType = `${this.type}s`;
      this.vm.typeTabs = 'eventAdmin';
      this.vm.title = `${this.vm.id ? 'Editar' : 'Nuevo'} Eventos`;
    }
  }

  private setTypesMedia() {
    if (this.type === 'media') {
      this.vm.apiType = `${this.type}`;
      this.vm.subType = this.route.snapshot.routeConfig!.path!.includes('sets')
        ? 'set'
        : 'track';
      this.vm.typeTabs = 'mediaAdmin';
      this.setTitleSub();
      this.vm.options.push(
        { name: 'Añadir Set', action: 'goToAdminSetAdd' },
        { name: 'Añadir Track', action: 'goToAdminTrackAdd' }
      );
    }
  }

  private setTypesArtist() {
    if (this.type === 'artist') {
      this.vm.bodyEvents.type = `${this.type}s`;
      this.vm.bodyMediaSet.type = `${this.type}s`;
      this.vm.bodyMediaTrack.type = `${this.type}s`;
      this.vm.apiType = `${this.type}s`;
      this.vm.typeTabs = 'artistAdmin';
      this.vm.title = `${this.vm.id ? 'Editar' : 'Nuevo'} Artista`;
    }
  }

  private setTitleSub() {
    if (this.type === 'media') {
      const titleMedia = this.vm.subType === 'set' ? 'Set' : 'Track';
      this.vm.title = `${this.vm.id ? 'Editar' : 'Nuevo'} ${titleMedia}`;
    } else {
      const titleSite = this.vm.subType === 'club' ? 'Club' : 'Festival';
      this.vm.title = `${this.vm.id ? 'Editar' : 'Nuevo'} ${titleSite}`;
    }
  }

  getItem() {
    const data: GetOneDto = {
      type: 'id',
      value: this.vm.id,
      admin: true,
    };
    this.apiService.getOne<any>(this.vm.apiType, data).subscribe({
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
            type:
              this.type === 'site' || this.type === 'media'
                ? this.vm.subType
                : this.type,
          },
        });
      },
    });
  }

  private setMeta() {
    let title: string;
    if (this.type === 'event') {
      title = `${this.vm.event.name} @ ${
        this.vm.event.site.name
      } - ${DateFunctions.new(this.vm.event.date).format('DD-MM-YYYY')}`;
    } else if (this.type === 'like') {
      title = 'Like';
    } else if (this.type === 'image') {
      title = 'Imagen';
    } else {
      title = this.vm[this.type].name!;
    }
    const meta: MetadataI = {
      title: title,
    };
    this.ui.meta.setMetaDynamic(meta);
  }

  private checkViews() {
    if (this.type === 'artist') {
      this.checkViewsArtist();
    } else if (this.type === 'site') {
      this.checkViewsSite();
    }
  }

  private checkViewsArtist() {
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

  private checkViewsSite() {
    if (this.vm.site.sets && this.vm.site.sets.count > 0) {
      this.getMediaSets();
    }
    if (this.vm.site.events && this.vm.site.events.count > 0) {
      this.getEvents();
    }
  }

  private getEvents() {
    this.vm.bodyEvents.id = this.vm[this.type]._id!;
    this.apiService
      .getAllForType<Event>('events', this.vm.bodyEvents)
      .subscribe({
        next: (response) => (this.vm.events = response),
        error: (err) => {
          this.vm.views = this.vm.views.filter(
            (item) => item.name !== 'Eventos'
          );
          this.ui.toast.showToast(TOAST_STATE.error, err);
        },
      });
  }

  private getMediaSets() {
    this.vm.bodyMediaSet.id = this.vm[this.type]._id!;
    this.apiService
      .getAllForType<Media>('media', this.vm.bodyMediaSet)
      .subscribe({
        next: (response) => (this.vm.sets = response),
        error: (err) => {
          this.vm.views = this.vm.views.filter((item) => item.name !== 'Sets');
          this.ui.toast.showToast(TOAST_STATE.error, err);
        },
      });
  }

  private getMediaTracks() {
    this.vm.bodyMediaTrack.id = this.vm[this.type]._id!;
    this.apiService
      .getAllForType<Media>('media', this.vm.bodyMediaTrack)
      .subscribe({
        next: (response) => (this.vm.tracks = response),
        error: (err) => {
          this.vm.views = this.vm.views.filter((item) => item.name !== 'Sets');
          this.ui.toast.showToast(TOAST_STATE.error, err);
        },
      });
  }

  showImage(data: ShowImageI) {
    this.ui.fullImage.show(data.image, data.remote);
  }

  onSubmit() {
    this.baseHelper.onSubmit(
      this.vm.apiType,
      this.type,
      this.vm.subType,
      this.vm[this.type],
      this.vm.scraping
    );
  }

  onSuccessUpdate(response: MessageI) {
    this.ui.toast.showToast(TOAST_STATE.success, response.message);
    let type!: GoToType;
    if (this.type === 'media' || this.type === 'site') {
      type = this.vm.subType;
    } else {
      type = this.type;
    }
    this.goToPage({
      type,
      typeRoute: 'all',
      admin: true,
    });
  }

  async onSuccessCreate(response: any) {
    this.vm[this.type]._id = response._id;
    for (const imageUrl of this.vm.tempImagesByUrl) {
      this.uploadImageByUrl(imageUrl);
    }
    for (const imageFile of this.vm.tempImagesByFile) {
      this.uploadImageByFile(imageFile);
    }
    setTimeout(() => {
      this.ui.toast.showToast(TOAST_STATE.success, 'Item creado');
      this.router.navigate([routesConfig.eventsAdmin]);
    }, 3000);
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

  removeImage(img: Image) {
    this.apiService.deleteOne('images', img._id!).subscribe({
      next: () => {
        if (
          this.type !== 'style' &&
          this.type !== 'like' &&
          this.type !== 'image'
        ) {
          this.vm[this.type].images = this.vm[this.type].images?.filter(
            (item) => item._id !== img._id
          );
          this.ui.toast.showToast(
            TOAST_STATE.info,
            'La imagen ha sido eliminada'
          );
        }
      },
      error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
    });
  }

  setFirstImage(img: Image) {
    const data: ImageSetFirstImageDto = {
      type: 'artist',
      typeId: this.vm[this.type]._id!,
      imageId: img._id!,
    };
    this.imageService.setFirstImage(data).subscribe({
      next: (response) => {
        if (
          this.type !== 'style' &&
          this.type !== 'like' &&
          this.type !== 'image'
        ) {
          this.vm[this.type].images = response;
          this.ui.toast.showToast(
            TOAST_STATE.info,
            'La imagen ha sido actualizada'
          );
        }
      },
      error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
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

  onDelete() {
    const modal = this.ui.modal.showModalConfirm(
      'Eliminar item',
      '¿Estas seguro de eliminar el item?'
    );
    const sub$ = modal.subscribe({
      next: (response) => {
        if (response !== '') {
          if (response === true) {
            this.apiService
              .deleteOne(this.vm.apiType, this.vm[this.type]._id!)
              .subscribe({
                next: (response) => this.onSuccessUpdate(response),
                error: (error) =>
                  this.ui.toast.showToast(TOAST_STATE.error, error),
              });
          }
          sub$.unsubscribe();
        }
      },
    });
  }
}
