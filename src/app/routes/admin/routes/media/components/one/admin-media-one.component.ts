import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { MessageI } from '@interfaces';
import { Artist, Media, Style } from '@models';
import {
  ArtistService,
  MediaService,
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
  bodyItems = { page: 1, pageSize: 1000, order: ['name', 'asc'] };
  artists: Artist[] = [];
  styles: Style[] = [];
  constructor(
    private artistService: ArtistService,
    private styleService: StyleService,
    private mediaService: MediaService,
    private toast: ToastService,
    private toastService: ToastService,
    private fullImage: FullImageService
  ) {}

  ngOnInit() {
    this.getAllStytles();
    this.getAllArtists();
  }

  getAllArtists() {
    this.artistService.getAll(this.bodyItems).subscribe({
      next: (response) => (this.artists = response.items),
      error: (error) => this.toast.showToast(TOAST_STATE.error, error),
    });
  }

  getAllStytles() {
    this.styleService.getAll(this.bodyItems).subscribe({
      next: (response) => (this.styles = response.items),
      error: (error) => this.toast.showToast(TOAST_STATE.error, error),
    });
  }

  onClickItem(type: 'artists' | 'styles', item: { name: string; _id: string }) {
    this.media[type] = this.media[type]?.filter(
      (mediaItem: Media) => mediaItem.name !== item.name
    );
  }

  onChangeArtistSelect(e: any) {
    if (this.media.artists!.length < 5) {
      const newItem = this.artists.find(
        (artist) => artist._id!.toString() === e.target.value.toString()
      );
      this.media.artists?.push(newItem);
    } else {
      this.toastService.showToast(
        TOAST_STATE.warning,
        'No puedes añadir mas de 3 artistas'
      );
    }
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
}
