import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import {
  EventService,
  MediaService,
  MetaService,
  NavigationService,
  SiteService,
  ToastService,
  TOAST_STATE,
} from '@services';
import { ArtistService } from '@shared/services/api/artist/artist.service';
import { MetadataI } from '@shared/services/system/meta';
import { NgxSpinnerService } from '@shared/services/system/ngx-spinner/ngx-spinner.service';
import { environment } from '@env/environment';
import { routesConfig } from '@core/config';
import { Observable } from 'rxjs';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { DateFunctions } from '@shared/utils/dates';
import { GenericOneBaseViewModel } from './generic-one.base.view-model';

@Component({
  selector: 'generic-one-base',
  templateUrl: './generic-one.base.html',
  animations: [inOutAnimation],
})
export class GenericOneBase implements OnInit {
  @Input() type!: 'artist' | 'site' | 'event';
  @Input() subType!: 'club' | 'festival';
  vm = new GenericOneBaseViewModel();

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private siteService: SiteService,
    private mediaService: MediaService,
    private eventService: EventService,
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private metaService: MetaService,
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.vm.slug = this.route.snapshot.paramMap.get('slug')!;
    this.setTypes();
    if (this.type) {
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

  getItem() {
    let service: Observable<any>;
    if (this.type === 'site') {
      service = this.siteService.getOne('slug', this.vm.slug);
    } else if (this.type === 'event') {
      service = this.eventService.getOne('slug', this.vm.slug);
    } else {
      service = this.artistService.getOne('slug', this.vm.slug);
    }
    service.subscribe({
      next: (response: any) => {
        this.vm[this.type] = response;
        this.setMeta();
        this.setViews();
        this.checkViews();
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
        this.router.navigate(['/404'], {
          skipLocationChange: true,
          state: {
            type: this.type === 'site' ? this.subType : this.type,
          },
        });
      },
    });
  }

  getEvents() {
    this.vm.bodyEvents.id = this.vm[this.type]._id!;
    this.eventService.getAllForType(this.vm.bodyEvents).subscribe({
      next: (response) => (this.vm.events = response.items),
      error: (err) => {
        this.vm.views = this.vm.views.filter((item) => item.name !== 'Eventos');
        this.toast.showToast(TOAST_STATE.error, err);
      },
    });
  }

  getMediaSets() {
    this.vm.bodyMediaSet.id = this.vm[this.type]._id!;
    this.mediaService.getAllForType(this.vm.bodyMediaSet).subscribe({
      next: (response) => (this.vm.sets = response.items),
      error: (err) => {
        this.vm.views = this.vm.views.filter((item) => item.name !== 'Sets');
        this.toast.showToast(TOAST_STATE.error, err);
      },
    });
  }

  getMediaTracks() {
    this.vm.bodyMediaTrack.id = this.vm[this.type]._id!;
    this.mediaService.getAllForType(this.vm.bodyMediaTrack).subscribe({
      next: (response) => (this.vm.tracks = response.items),
      error: (err) => {
        this.vm.views = this.vm.views.filter((item) => item.name !== 'Tracks');
        this.toast.showToast(TOAST_STATE.error, err);
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
    const typeRoute = this.type === 'site' ? this.subType : this.type;
    const meta: MetadataI = {
      title: title,
      image: `${environment.urls.images}/${this.type}s/big/${
        this.vm[this.type].images![0].url
      }`,
      url: `${environment.urls.app}${routesConfig[typeRoute].replace(
        ':slug',
        this.vm[this.type].slug!
      )}`,
    };
    if (this.vm[this.type].info !== '') {
      meta.description = this.vm[this.type].info;
    }
    this.metaService.setMetaDynamic(meta);
  }

  setViews() {
    if (this.type === 'artist' || this.type === 'site') {
      if (this.vm[this.type].sets && this.vm[this.type].sets.count > 0) {
        this.vm.views.push({
          name: 'Sets',
          value: 'set',
          counter: this.vm[this.type].sets.count,
        });
      }
      if (
        this.type === 'artist' &&
        this.vm.artist.tracks &&
        this.vm.artist.tracks.count > 0
      ) {
        this.vm.views.push({
          name: 'Tracks',
          value: 'track',
          counter: this.vm.artist.tracks.count,
        });
      }

      if (this.vm[this.type].events && this.vm[this.type].events.count > 0) {
        this.vm.views.push({
          name: 'Eventos',
          value: 'event',
          counter: this.vm[this.type].events
            ? this.vm[this.type].events.count
            : 0,
        });
      }
    }
    if (
      this.type === 'event' &&
      this.vm.event.artists &&
      this.vm.event.artists.length > 0
    ) {
      this.vm.views.push({
        name: 'Artistas',
        value: 'artist',
        counter: this.vm.event.artists.length,
      });
    }
    if (this.vm[this.type].images && this.vm[this.type].images!.length > 1) {
      this.vm.views.push({
        name: 'Imagenes',
        value: 'image',
        counter:
          this.vm[this.type].images && this.vm[this.type].images!.length === 0
            ? this.vm[this.type].images!.length
            : this.vm[this.type].images!.length - 1,
      });
    }
  }

  checkViews() {
    if (this.vm.views.filter((item) => item.name === 'Sets').length > 0) {
      this.getMediaSets();
    }
    if (this.vm.views.filter((item) => item.name === 'Tracks').length > 0) {
      this.getMediaTracks();
    }
    if (this.vm.views.filter((item) => item.name === 'Eventos').length > 0) {
      this.getEvents();
    }
  }

  goToPage(data: GoToPageI) {
    this.navigationService.goToPage(data);
  }
}
