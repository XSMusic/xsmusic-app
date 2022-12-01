import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MetadataI } from '.';

@Injectable({ providedIn: 'root' })
export class MetaService {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta,
    private titleService: Title
  ) {}

  setMetaDynamic(data: MetadataI) {
    this.setAllMeta(data);
  }

  setMeta() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const rt = this.getChild(this.route);
        rt.data.subscribe((data: MetadataI) => {
          this.setAllMeta(data);
        });
      });
  }

  private setAllMeta(data: MetadataI) {
    console.log(data);
    this.setTitle(data);
    this.setDescription(data);
    this.setImage(data);
    this.setUrl(data);
    this.setRobots(data);
    this.setVarious();
  }

  private setTitle(data: MetadataI) {
    if (data.title) {
      this.titleService.setTitle(data.title);
      this.meta.updateTag({
        property: 'og:title',
        content: data.title,
      });
      this.meta.updateTag({
        property: 'twitter:title',
        content: data.title,
      });
    } else {
      this.meta.removeTag("property='og:title'");
      this.meta.removeTag("property='twitter:title'");
    }
  }

  private setDescription(data: MetadataI) {
    if (data.description) {
      this.meta.updateTag({
        name: 'description',
        content: data.description,
      });
      this.meta.updateTag({
        property: 'og:description',
        content: data.description,
      });
      this.meta.updateTag({
        property: 'twitter:description',
        content: data.description,
      });
    } else {
      this.meta.removeTag("name='description'");
      this.meta.removeTag("name='og:description'");
      this.meta.removeTag("name='twitter:description'");
    }
  }

  private setImage(data: MetadataI) {
    if (data.image) {
      this.meta.updateTag({
        property: 'og:image',
        content: data.image,
      });
      this.meta.updateTag({
        property: 'og:image:width',
        content: '500',
      });
      this.meta.updateTag({
        property: 'og:image:height',
        content: '500',
      });
      this.meta.updateTag({
        property: 'twitter:image',
        content: data.image,
      });
    } else {
      this.meta.updateTag({
        property: 'og:image',
        content: 'https://api.xsmusic.es/uploads/brand/XSMusic-light.png',
      });
      this.meta.updateTag({
        property: 'og:image:width',
        content: '500',
      });
      this.meta.updateTag({
        property: 'og:image:height',
        content: '500',
      });
      this.meta.updateTag({
        property: 'twitter:image',
        content: 'https://api.xsmusic.es/uploads/brand/XSMusic-light.png',
      });
    }
  }

  private setUrl(data: MetadataI) {
    if (data.url) {
      this.meta.updateTag({
        property: 'og:url',
        content: data.url,
      });
    } else {
      this.meta.updateTag({
        property: 'og:url',
        content: this.router.url,
      });
    }
  }

  private setRobots(data: MetadataI) {
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
  }

  setVarious() {
    this.meta.updateTag({
      property: 'twitter:site',
      content: '@XSMusices',
    });
    this.meta.updateTag({
      property: 'twitter:creator',
      content: '@XSMusices',
    });
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'XSMusic',
    });
  }

  private getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
