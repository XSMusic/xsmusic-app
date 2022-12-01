import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export interface MetaDynamicI {
  title: string,
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class MetaService {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta,
    private titleService: Title
  ) { }

  setMetaDynamic() {
    // TODO: Hacer esto
  }

  setMeta() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const rt = this.getChild(this.route);

        rt.data.subscribe((data: any) => {
          console.log(data);
          this.titleService.setTitle(data.title);

          if (data.description) {
            this.meta.updateTag({
              name: 'description',
              content: data.description,
            });
          } else {
            this.meta.removeTag("name='description'");
          }

          if (data.robots) {
            this.meta.updateTag({
              name: 'robots',
              content: data.robots,
            });
          } else {
            this.meta.updateTag({
              name: 'robots',
              content: 'follow,index',
            });
          }

          if (data.ogUrl) {
            this.meta.updateTag({
              property: 'og:url',
              content: data.ogUrl,
            });
          } else {
            this.meta.updateTag({
              property: 'og:url',
              content: this.router.url,
            });
          }

          if (data.title) {
            this.meta.updateTag({
              property: 'og:title',
              content: data.title,
            });
          } else {
            this.meta.removeTag("property='og:title'");
          }

          if (data.description) {
            this.meta.updateTag({
              property: 'og:description',
              content: data.description,
            });
          } else {
            this.meta.removeTag("property='og:description'");
          }

          if (data.ogImage) {
            this.meta.updateTag({
              property: 'og:image',
              content: data.ogImage,
            });
          } else {
            this.meta.removeTag("property='og:image'");
          }
        });
      });
  }

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
