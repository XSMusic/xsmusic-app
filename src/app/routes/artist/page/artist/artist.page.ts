import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Artist, Event, Media } from '@models';
import {
  EventService,
  MediaService,
  MetaService,
  ToastService,
  TOAST_STATE,
} from '@services';
import { ArtistService } from '@shared/services/api/artist/artist.service';
import { MetadataI } from '@shared/services/system/meta';
import { NgxSpinnerService } from '@shared/services/system/ngx-spinner/ngx-spinner.service';
import { environment } from '@env/environment';
import { routesConfig } from '@core/config';
import { EventGetAllForTypeDto } from '@shared/services/api/event/event.dto';
import { MediaGetAllForTypeDto } from '@shared/services/api/media/media.dto';

@Component({
  selector: 'page-artist',
  templateUrl: 'artist.page.html',
  animations: [inOutAnimation],
})
export class ArtistPage implements OnInit {
  artist!: Artist;
  artists: Artist[] = [];
  slug!: string;
  views: any[] = [];
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
  events: Event[] = [];
  sets: Media[] = [];
  tracks: Media[] = [];

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private mediaService: MediaService,
    private eventService: EventService,
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private metaService: MetaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.getArtist();
  }

  getArtist() {
    this.artistService.getOne('slug', this.slug).subscribe({
      next: (response) => {
        this.artist = response;
        this.setMeta();
        this.setViews();
        if (this.views.filter((item) => item.name === 'Sets').length > 0) {
          this.getMediaSets();
        }
        if (this.views.filter((item) => item.name === 'Tracks').length > 0) {
          this.getMediaTracks();
        }
        if (this.views.filter((item) => item.name === 'Eventos').length > 0) {
          this.getEvents();
        }
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
        this.router.navigate(['/404'], {
          skipLocationChange: true,
          state: {
            type: 'artist',
          },
        });
      },
    });
  }

  getEvents() {
    this.bodyEvents.id = this.artist._id!;
    this.eventService.getAllForType(this.bodyEvents).subscribe({
      next: (response) => (this.events = response.items),
      error: (err) => {
        this.views = this.views.filter((item) => item.name !== 'Eventos');
        this.toast.showToast(TOAST_STATE.error, err);
      },
    });
  }

  getMediaSets() {
    this.bodyMediaSet.id = this.artist._id!;
    this.mediaService.getAllForType(this.bodyMediaSet).subscribe({
      next: (response) => (this.sets = response.items),
      error: (err) => {
        this.views = this.views.filter((item) => item.name !== 'Sets');
        this.toast.showToast(TOAST_STATE.error, err);
      },
    });
  }

  getMediaTracks() {
    this.bodyMediaTrack.id = this.artist._id!;
    this.mediaService.getAllForType(this.bodyMediaTrack).subscribe({
      next: (response) => (this.tracks = response.items),
      error: (err) => {
        this.views = this.views.filter((item) => item.name !== 'Sets');
        this.toast.showToast(TOAST_STATE.error, err);
      },
    });
  }

  setMeta() {
    const meta: MetadataI = {
      title: this.artist.name,
      image: `${environment.urls.images}/${this.artist.images![0].url}`,
      url: `${environment.urls.app}${routesConfig.artist.replace(
        ':slug',
        this.artist.slug!
      )}`,
    };
    if (this.artist.info !== '') {
      meta.description = this.artist.info;
    }
    this.metaService.setMetaDynamic(meta);
  }

  setViews() {
    if (this.artist.sets && this.artist.sets.count > 0) {
      this.views.push({
        name: 'Sets',
        value: 'set',
        counter: this.artist.sets.count,
      });
    }
    if (this.artist.tracks && this.artist.tracks.count > 0) {
      this.views.push({
        name: 'Tracks',
        value: 'track',
        counter: this.artist.tracks.count,
      });
    }
    if (this.artist.events && this.artist.events.count > 0) {
      this.views.push({
        name: 'Eventos',
        value: 'event',
        counter: this.artist.events ? this.artist.events.count : 0,
      });
    }
    if (this.artist.images && this.artist.images.length > 1) {
      this.views.push({
        name: 'Imagenes',
        value: 'image',
        counter:
          this.artist.images.length === 0
            ? this.artist.images.length
            : this.artist.images.length - 1,
      });
    }
  }
}
