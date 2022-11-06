import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { GetAllDto, MessageI } from '@interfaces';
import { Artist, Media, Site, Style } from '@models';
import {
  ArtistService,
  MediaService,
  SiteService,
  StyleService,
  ToastService,
} from '@services';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'admin-media-one',
  templateUrl: 'admin-media-one.component.html',
  animations: [inOutAnimation],
})
export class AdminMediaOneComponent {
  @Input() media: Media = new Media();
  @Output() onSubmitSuccess: EventEmitter<any> = new EventEmitter<void>();
  sources = [{ name: 'Youtube', value: 'youtube' }];
  bodyArtist: GetAllDto = {
    page: 1,
    pageSize: 5,
    order: ['name', 'asc'],
    filter: [],
  };
  bodySite: GetAllDto = {
    page: 1,
    pageSize: 5,
    order: ['name', 'asc'],
    filter: [],
    type: 'all',
  };
  artistsSearch: Artist[] = [];
  sitesSearch: Site[] = [];
  styles: Style[] = [];
  selectArtistsState = false;
  selectSitesState = false;
  artistSearch = null;
  siteSearch = null;
  constructor(
    private artistService: ArtistService,
    private styleService: StyleService,
    private siteService: SiteService,
    private mediaService: MediaService,
    private toast: ToastService,
    private toastService: ToastService,
    private fullImage: FullImageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllStytles();
  }

  getAllStytles() {
    this.styleService
      .getAll({
        page: 1,
        pageSize: 100,
        order: ['name', 'asc'],
        complete: false,
      })
      .subscribe({
        next: (response) => (this.styles = response.items),
        error: (error) => this.toast.showToast(TOAST_STATE.error, error),
      });
  }

  onClickItem(type: 'artists' | 'styles', item: { name: string; _id: string }) {
    this.media[type] = this.media[type]?.filter(
      (mediaItem: Media) => mediaItem.name !== item.name
    );
  }

  closeSelection(type: string) {
    if (type === 'artists') {
      this.selectArtistsState = false;
    } else {
      this.selectSitesState = false;
    }
  }

  onChangeInputArtist(e: any) {
    if (this.media.artists!.length < 3) {
      this.bodyArtist.filter = ['name', e.target.value];
      this.artistService.getAll(this.bodyArtist).subscribe({
        next: (response) => {
          this.artistsSearch = response.items;
          this.selectArtistsState = true;
        },
        error: (error) => this.toast.showToast(TOAST_STATE.error, error),
      });
    } else {
      this.toast.showToast(TOAST_STATE.warning, '3 artistas maximo');
    }
  }

  onSelectArtist(artist: Artist) {
    if (this.media.artists!.length < 3) {
      this.media.artists?.push(artist);
      this.artistSearch = null;
      this.selectArtistsState = false;
    } else {
      this.toast.showToast(TOAST_STATE.warning, '3 artistas maximo');
      this.selectArtistsState = false;
    }
  }

  onChangeInputSite(e: any) {
    this.bodySite.filter = ['name', e.target.value];
    this.siteService.getAll(this.bodySite).subscribe({
      next: (response) => (this.sitesSearch = response.items),
      error: (error) => this.toast.showToast(TOAST_STATE.error, error),
    });
    this.selectSitesState = true;
  }

  onSelectSite(site: Site) {
    this.media.site = site;
    this.siteSearch = null;
    this.selectSitesState = false;
  }

  onChangeStyleSelect(e: any) {
    if (this.media.styles!.length < 5) {
      const netItem = this.styles.find(
        (style) => style._id!.toString() === e.target.value.toString()
      );
      this.media.styles?.push(netItem);
    } else {
      this.toastService.showToast(
        TOAST_STATE.warning,
        'No puedes añadir mas de 5 estilos'
      );
    }
  }

  onSubmit() {
    const validation = this.validationSubmit();
    if (validation.state) {
      const observable = this.media._id
        ? this.mediaService.update(this.media)
        : this.mediaService.create(this.media);
      observable.subscribe({
        next: (response) => this.onSuccess(response),
        error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
      });
    } else {
      this.toast.showToast(TOAST_STATE.error, validation.message);
    }
  }

  validationSubmit() {
    if (this.media.name === '') {
      return {
        state: false,
        message: 'El nombre es obligatorio',
      };
    } else if (this.media.source === '') {
      return {
        state: false,
        message: 'El medio es obligatorio',
      };
    } else if (this.media.artists!.length === 0) {
      return {
        state: false,
        message: 'Minimo un artista',
      };
    } else if (this.media.styles!.length === 0) {
      return {
        state: false,
        message: 'Minimo un estilo',
      };
    } else if (this.media.sourceId === '') {
      return {
        state: false,
        message: 'El id del video es obligatorio',
      };
    } else {
      return {
        state: true,
        message: '',
      };
    }
  }

  onDelete() {
    // TODO: Añadir confirmacion por modal
    this.mediaService.deleteOne(this.media._id!).subscribe({
      next: (response) => this.onSuccess(response),
      error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  onSuccess(response: MessageI) {
    this.toastService.showToast(TOAST_STATE.success, response.message);
    this.onSubmitSuccess.emit();
  }

  showImage(image: string) {
    this.fullImage.showImageFull(image);
  }

  goToMedia(slug: string) {
    if (this.media.type === 'set') {
      this.router.navigate([routesConfig.set.replace(':slug', slug)]);
    } else {
      this.router.navigate([routesConfig.track.replace(':slug', slug)]);
    }
  }
}
