import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { GoToPageI } from '../../interfaces/goto.interface';
import { routesConfig } from '@core/config';

@Injectable()
export class NavigationService {
  private history: string[] = [];

  constructor(private router: Router, private location: Location) {}

  public startSaveHistory(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public goBack(): void {
    this.history.pop();

    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }

  public getPreviousUrl(): string {
    if (this.history.length > 0) {
      return this.history[this.history.length - 2];
    }

    return '';
  }

  goToPage(data: GoToPageI) {
    try {
      let route: any = '';
      const typeOne = `${data.type}`;
      const typeAll = `${data.type}s`;
      route = `${data.typeRoute === 'one' ? typeOne : typeAll}`;
      if (data.admin) {
        route = routesConfig[route + 'Admin'];
      } else {
        route = routesConfig[route];
      }

      if (data.item) {
        if (data.admin) {
          route = route.replace(':id', data.item._id);
        } else {
          route = route.replace(':slug', data.item.slug);
        }
      }
      this.router.navigate([route]);
    } catch (error) {
      console.error('Error en goToPage');
    }
  }
}
