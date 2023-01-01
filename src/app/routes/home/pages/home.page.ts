import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { ResumeService, TOAST_STATE, UIService } from '@services';
import {
  GenericItemsAllType,
  GoToRouteType,
  GenericItemAllType,
} from '@shared/utils';
import { HomeViewModel } from './home.view-model';

@Component({
  selector: 'home',
  templateUrl: 'home.page.html',
})
export class HomePage implements OnInit {
  vm = new HomeViewModel();
  constructor(
    private resumeService: ResumeService,
    private ui: UIService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getItems();
  }

  getBodyType(type: GenericItemsAllType) {
    switch (type) {
      case 'events':
        return 'bodyEvents';
      case 'sets':
      case 'tracks':
        this.vm.bodyMedia.type = type === 'sets' ? 'set' : 'track';
        return 'bodyMedia';
      case 'clubs':
      case 'festivals':
        this.vm.bodySites.type = type === 'clubs' ? 'club' : 'festival';
        return 'bodySites';
      default:
        return 'bodyArtists';
    }
  }

  getItems() {
    const service = this.resumeService.getForAll();
    service.subscribe({
      next: (response) => {
        this.vm.artists = response.artists;
        this.vm.events = response.events;
        this.vm.clubs = response.clubs;
        this.vm.festivals = response.festivals;
        this.vm.sets = response.sets;
        this.vm.tracks = response.tracks;
        this.vm.loading = false;
      },
      error: (error) => {
        this.vm.error = true;
        this.vm.loading = false;
        this.ui.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  goTo(event: {
    type: GenericItemAllType;
    typeRoute: GoToRouteType;
    slug?: string;
  }) {
    if (event.typeRoute === 'one') {
      this.router.navigate([
        routesConfig[event.type].replace(':slug', event.slug!),
      ]);
    } else {
      this.router.navigate([routesConfig[`${event.type}s`]]);
    }
  }
}
