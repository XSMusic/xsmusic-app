import { Component } from '@angular/core';
import { Artist, Event, Media, Style } from '@models';
import {
  ArtistService,
  EventService,
  MediaService,
  NavigationService,
  ToastService,
} from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { countries } from 'assets/data/countries';
import { NgxSpinnerService } from '@shared/services/system/ngx-spinner/ngx-spinner.service';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { routesConfig } from '@core/config';
import { OptionsItemI } from '@shared/components/ui/options-items/options-items.interface';
import { EventGetAllForTypeDto } from '@shared/services/api/event/event.dto';
import { MediaGetAllForTypeDto } from '@shared/services/api/media/media.dto';
import { GoToPageI } from '../../../../../../shared/interfaces/goto.interface';

@Component({
  selector: 'page-admin-artist',
  templateUrl: 'admin-artist.page.html',
})
export class AdminArtistPage {
  id!: string;
  artist = new Artist();
  styles: Style[] = [];
  title!: string;
  countries = countries;
  scraping: any = {
    images: [],
    infos: [],
  };
  view = 'viewInfo';
  options = [
    { name: 'Añadir Set', action: 'goToAdminSetAdd' },
    { name: 'Añadir Track', action: 'goToAdminTrackAdd' },
  ];
  bodyEvents: EventGetAllForTypeDto = {
    page: 1,
    pageSize: 10,
    order: ['created', 'asc'],
    id: '',
    type: 'artists',
  };
  bodyMediaSet: MediaGetAllForTypeDto = {
    page: 1,
    pageSize: 10,
    order: ['created', 'asc'],
    id: '',
    type: 'artists',
    typeMedia: 'set',
  };
  bodyMediaTrack: MediaGetAllForTypeDto = {
    page: 1,
    pageSize: 10,
    order: ['created', 'asc'],
    id: '',
    type: 'artists',
    typeMedia: 'track',
  };
  sets: Media[] = [];
  tracks: Media[] = [];
  events: Event[] = [];
  constructor(
    private artistService: ArtistService,
    private eventService: EventService,
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toast: ToastService,
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.title = 'Editar Artista';
      this.getOne();
    } else {
      this.title = 'Nuevo Artista';
    }
  }

  getOne() {
    this.spinner.show();
    this.artistService.getOne('id', this.id).subscribe({
      next: (response) => {
        this.artist = response;
        if (!this.artist.social) {
          this.artist.social = {
            web: '',
            facebook: '',
            twitter: '',
            soundcloud: '',
            spotify: '',
            tiktok: '',
            youtube: '',
            mixcloud: '',
            instagram: '',
          };
        }
        this.getEvents();
        this.getMediaSets();
        this.getMediaTracks();
        this.spinner.hide();
      },
      error: (error) => {
        this.toast.showToast(TOAST_STATE.error, error);
        this.spinner.hide();
      },
    });
  }

  getEvents() {
    this.bodyEvents.id = this.artist._id!;
    this.eventService.getAllForType(this.bodyEvents).subscribe({
      next: (response) => (this.events = response.items),
      error: (err) => {
        this.toast.showToast(TOAST_STATE.error, err);
      },
    });
  }

  getMediaSets() {
    this.bodyMediaSet.id = this.artist._id!;
    this.mediaService.getAllForType(this.bodyMediaSet).subscribe({
      next: (response) => (this.sets = response.items),
      error: (err) => {
        this.toast.showToast(TOAST_STATE.error, err);
      },
    });
  }

  getMediaTracks() {
    this.bodyMediaTrack.id = this.artist._id!;
    this.mediaService.getAllForType(this.bodyMediaTrack).subscribe({
      next: (response) => (this.tracks = response.items),
      error: (err) => {
        this.toast.showToast(TOAST_STATE.error, err);
      },
    });
  }

  onClickButton(event: ButtonBlockItem) {
    this.view = event.action;
  }

  goToPage(data: GoToPageI) {
    data.admin = true;
    this.navigationService.goToPage(data);
  }

  onClickOptionItem(event: OptionsItemI) {
    if (event.action === 'goToAdminSetAdd') {
      this.router.navigate([
        routesConfig.setAdminAddData
          .replace(':source', 'default')
          .replace(':value', this.artist.name),
      ]);
    } else if (event.action === 'goToAdminTrackAdd') {
      this.router.navigate([
        routesConfig.trackAdminAddData
          .replace(':source', 'default')
          .replace(':value', this.artist.name),
      ]);
    }
  }
}
