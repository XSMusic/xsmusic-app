import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { PaginatorI } from '@interfaces';
import { ApiService, ToastService, TOAST_STATE } from '@services';
import { ApiAllTypes, GenericAllItemsType, GoToRouteType, GoToType } from '@shared/utils';
import { Observable } from 'rxjs';
import { HomeViewModel } from './home.view-model';

@Component({
  selector: 'home',
  templateUrl: 'home.page.html',
})
export class HomePage implements OnInit {
  vm = new HomeViewModel();
  constructor(
    private apiService: ApiService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    for (const item of this.vm.items) {
      this.getItems(item.type, item.typeItems);
    }
  }

  getBodyType(type: GenericAllItemsType) {
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

  getItems(type: ApiAllTypes, typeItems: GenericAllItemsType) {
    this.vm.loading[typeItems] = true;
    const service = this.apiService.getAll<any>(
      type,
      this.vm[this.getBodyType(typeItems)]
    );
    this.subscription(service, typeItems);
  }

  subscription(
    service: Observable<PaginatorI<any>>,
    typeItems: GenericAllItemsType
  ) {
    service.subscribe({
      next: (response) => {
        this.vm[typeItems] = response.items;
        this.vm.loading[typeItems] = false;
      },
      error: (error) => {
        this.vm.loading[typeItems] = false;
        this.vm.error[typeItems] = true;
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  goTo(event: { type: GoToType; typeRoute: GoToRouteType; slug?: string }) {
    if (event.typeRoute === 'one') {
      this.router.navigate([
        routesConfig[event.type].replace(':slug', event.slug!),
      ]);
    } else {
      this.router.navigate([routesConfig[`${event.type}s`]]);
    }
  }
}
