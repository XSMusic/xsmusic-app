import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routesConfig } from '@core/config';
import {
  ArtistService,
  EventService,
  MediaService,
  SiteService,
  ToastService,
  TOAST_STATE,
} from '@services';
import { HomeViewModel } from './home.view-model';

@Component({
  selector: 'home',
  templateUrl: 'home.page.html',
})
export class HomePage implements OnInit {
  vm = new HomeViewModel();
  constructor(
    private artistService: ArtistService,
    private mediaService: MediaService,
    private eventService: EventService,
    private siteService: SiteService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getArtists();
    this.getEvents();
    this.getMedia('sets');
    this.getMedia('tracks');
    this.getLastSites('clubs');
    this.getLastSites('festivals');
  }

  getArtists() {
    this.vm.loading.artists = true;
    this.artistService.getAll(this.vm.bodyArtists).subscribe({
      next: (response) => {
        this.vm.artists = response.items;
        this.vm.loading.artists = false;
      },
      error: (error) => {
        this.vm.loading.artists = false;
        this.vm.error.artists = true;
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  getEvents() {
    this.eventService.getAll(this.vm.bodyEvents).subscribe({
      next: (response) => {
        this.vm.events = response.items;
        this.vm.loading.events = false;
      },
      error: (error: any) => {
        this.vm.error.events = true;
        this.vm.loading.events = false;
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  getMedia(type: 'sets' | 'tracks') {
    this.vm.loading[type] = true;
    this.vm.bodyMedia.type = type === 'sets' ? 'set' : 'track';
    this.mediaService.getAll(this.vm.bodyMedia).subscribe({
      next: (response) => {
        this.vm[type] = response.items;
        this.vm.loading[type] = false;
      },
      error: (error) => {
        this.vm.error[type] = true;
        this.vm.loading[type] = false;
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  getLastSites(type: 'clubs' | 'festivals') {
    this.vm.loading[type] = true;
    this.vm.bodySites.type = type === 'clubs' ? 'club' : 'festival';
    this.siteService.getAll(this.vm.bodySites).subscribe({
      next: (response) => {
        this.vm[type] = response.items;
        this.vm.loading[type] = false;
      },
      error: (error) => {
        this.vm.error[type] = true;
        this.vm.loading[type] = false;
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  goTo(event: {
    type: 'artist' | 'club' | 'festival' | 'event' | 'set' | 'track';
    typeRoute: 'all' | 'one';
    slug?: string;
  }) {
    if (event.typeRoute === 'one') {
      this.router.navigate([
        routesConfig[event.type].replace(':slug', event.slug!),
      ]);
    } else {
        this.router.navigate([
          routesConfig[`${event.type}s`],
        ]);
    }
  }
}
