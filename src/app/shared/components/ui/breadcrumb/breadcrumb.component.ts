import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';

export interface IBreadCrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'breadcrumb',
  templateUrl: 'breadcrumb.component.html',
})
export class BreadcrumbeComponent implements OnInit {
  breadcrumbs: IBreadCrumb[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      });
  }

  buildBreadCrumb(
    route: ActivatedRoute,
    url = '',
    breadcrumbs: IBreadCrumb[] = []
  ): IBreadCrumb[] {
    let label =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data['breadcrumb']
        : '';
    let path =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.path!
        : '';

    const lastRoutePart = path.split('/').pop() ?? '';
    const isDynamicRoute = lastRoutePart.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }

    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadCrumb = {
      label: label,
      url: nextUrl,
    };
    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
