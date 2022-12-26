import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import {
  ApiService,
  ImageService,
  UIService,
  ValidationsFormService,
} from '@services';
import { routesConfig } from '@core/config';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { OptionsItemI } from '@shared/components/ui/options-items/options-items.interface';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';
import { DateFunctions } from '@shared/utils/dates';
import { MetadataI } from '@shared/services/system/meta';
import {
  ApiTypes,
  GenericItemType,
  GenericSubItemType,
  GoToType,
} from '@shared/utils';
import { GenericAdminOneBaseViewModel } from './generic-admin-one.base.view-model';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { GetOneDto } from '@shared/services/api/api.dtos';
import { Event, Image, Media } from '@models';
import { MessageI } from '@interfaces';
import {
  ImageSetFirstImageDto,
  ImageUploadByUrlDto,
  ImageUploadDto,
} from '@shared/services/api/image/image.dto';

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
    private imageService: ImageService,
    private router: Router,
    private ui: UIService,
    private validationsFormService: ValidationsFormService
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
      this.vm.apiType = `${this.type}s`;
    } else if (this.type === 'media') {
      this.vm.apiType = `${this.type}`;
    } else if (this.type === 'event') {
      this.vm.apiType = `${this.type}s`;
    } else if (this.type === 'site') {
      this.vm.bodyEvents.type = `${this.type}`;
      this.vm.bodyMediaSet.type = `${this.type}`;
      this.vm.bodyMediaTrack.type = `${this.subType}s`;
      this.vm.apiType = `${this.type}s`;
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
    this.apiService
      .getAllForType<Event>('events', this.vm.bodyEvents)
      .subscribe({
        next: (response) => (this.vm.events = response.items),
        error: (err) => {
          this.vm.views = this.vm.views.filter(
            (item) => item.name !== 'Eventos'
          );
          this.ui.toast.showToast(TOAST_STATE.error, err);
        },
      });
  }

  getMediaSets() {
    this.vm.bodyMediaSet.id = this.vm[this.type]._id!;
    this.apiService
      .getAllForType<Media>('media', this.vm.bodyMediaSet)
      .subscribe({
        next: (response) => (this.vm.sets = response.items),
        error: (err) => {
          this.vm.views = this.vm.views.filter((item) => item.name !== 'Sets');
          this.ui.toast.showToast(TOAST_STATE.error, err);
        },
      });
  }

  getMediaTracks() {
    this.vm.bodyMediaTrack.id = this.vm[this.type]._id!;
    this.apiService
      .getAllForType<Media>('media', this.vm.bodyMediaTrack)
      .subscribe({
        next: (response) => (this.vm.tracks = response.items),
        error: (err) => {
          this.vm.views = this.vm.views.filter((item) => item.name !== 'Sets');
          this.ui.toast.showToast(TOAST_STATE.error, err);
        },
      });
  }

  showImage(data: { image: Image; remote: boolean }) {
    this.ui.fullImage.show(data.image, data.remote);
  }

  onSubmit(data: { scraping: any }): void {
    if (data.scraping) {
      this.vm.scraping = data.scraping;
    }
    const validation = this.validationsFormService.validation(
      this.type,
      this.vm[this.type],
      this.vm.tempImagesByUrl,
      this.vm.tempImagesByFile
    );
    if (validation.state) {
      if (this.vm[this.type]._id) {
        this.apiService.update(this.vm.apiType, this.vm[this.type]).subscribe({
          next: () => this.onSuccessUpdate({ message: 'Artista actualizado' }),
          error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
        });
      } else {
        this.apiService.create(this.vm.apiType, this.vm[this.type]).subscribe({
          next: (response) => this.onSuccessCreate(response),
          error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
        });
      }
    } else {
      this.ui.toast.showToast(TOAST_STATE.error, validation.message);
    }
  }

  onSuccessUpdate(response: MessageI) {
    this.ui.toast.showToast(TOAST_STATE.success, response.message);
    let type: GoToType = 'artist';
    if (
      this.type === 'event' ||
      this.type === 'media' ||
      this.type === 'site'
    ) {
      type = this.subType;
    } else {
      type = this.type;
    }
    this.goToPage({
      type: type,
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
      this.ui.toast.showToast(TOAST_STATE.success, 'Sitio creado');
      this.router.navigate([routesConfig.eventsAdmin]);
    }, 3000);
  }

  uploadImageByFile(image: File) {
    const temp = this.vm[this.type]._id ? false : true;
    const data: ImageUploadDto = {
      type: this.type,
      id: this.vm[this.type]._id!,
    };
    if (!temp) {
      this.uploadImageByFileNormal(data, image);
    } else {
      this.uploadImageByFileTemp(image);
    }
  }

  private uploadImageByFileNormal(data: ImageUploadDto, image: File) {
    this.ui.spinner.show();
    this.imageService.upload(data, image).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.vm[this.type].images?.push(response);
          this.ui.spinner.hide();
        }, 1000);
      },
      error: (error) => {
        this.ui.spinner.hide();
        this.ui.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  private uploadImageByFileTemp(image: File) {
    this.vm.tempImagesByFile.push(image);
  }

  uploadImageByUrl(image: string) {
    const temp = this.vm[this.type]._id ? false : true;
    const data: ImageUploadByUrlDto = {
      id: this.vm[this.type]._id!,
      type: 'event',
      url: image,
    };
    if (!temp) {
      this.uploadImageByUrlNormal(data);
    } else {
      this.uploadImageByUrlTemp(image);
    }
  }

  private uploadImageByUrlNormal(data: ImageUploadByUrlDto) {
    this.ui.spinner.show();
    this.imageService.uploadByUrl(data).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.vm[this.type].images?.push(response);
          this.ui.spinner.hide();
        }, 1000);
      },
      error: (error) => {
        this.ui.spinner.hide();
        this.ui.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  private uploadImageByUrlTemp(image: string) {
    this.vm.tempImagesByUrl.push(image);
    if (this.vm.scraping.images && this.vm.scraping.images.length > 0) {
      this.vm.scraping.images = this.vm.scraping.images.filter(
        (img: string) => img !== image
      );
    }
  }

  removeImage(img: Image) {
    this.apiService.deleteOne('images', img._id!).subscribe({
      next: () => {
        this.vm[this.type].images = this.vm[this.type].images?.filter(
          (item) => item._id !== img._id
        );
        this.ui.toast.showToast(
          TOAST_STATE.info,
          'La imagen ha sido eliminada'
        );
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
        this.vm[this.type].images = response;
        this.ui.toast.showToast(
          TOAST_STATE.info,
          'La imagen ha sido actualizada'
        );
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
