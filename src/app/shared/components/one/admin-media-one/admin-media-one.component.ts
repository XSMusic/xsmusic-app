import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { ShowImageI } from '@interfaces';
import { Artist, Image, Media, Site, Style } from '@models';
import { GetAllDto } from '@shared/services/api/api.dtos';

@Component({
  selector: 'admin-media-one',
  templateUrl: 'admin-media-one.component.html',
  animations: [inOutAnimation],
})
export class AdminMediaOneComponent {
  @Input() media: Media = new Media();
  @Input() scraping: any = {
    images: [],
    infos: [],
    styles: [],
  };

  sources = [{ name: 'Youtube', value: 'youtube' }];
  bodyArtist = new GetAllDto({
    pageSize: 5,
    order: ['name', 'asc'],
  });
  bodySite = new GetAllDto({
    pageSize: 5,
    order: ['name', 'asc'],
    type: 'all',
  });
  artistsSearch: Artist[] = [];
  sitesSearch: Site[] = [];
  styles: Style[] = [];
  selectArtistsState = false;
  selectSitesState = false;
  artistSearch = null;
  siteSearch = null;
  image = '';
  imageState = false;
  tempImages: string[] = [];
  defaultSite = '6367d34e5ba8b44fdf9476c2';
  @Output() onSubmit = new EventEmitter<{ scraping: any }>();
  @Output() showImage = new EventEmitter<ShowImageI>();
  @Output() uploadImageByUrl = new EventEmitter<string>();
  @Output() uploadImageByFile = new EventEmitter<File>();
  @Output() removeImage = new EventEmitter<Image>();
  @Output() setFirstImage = new EventEmitter<Image>();
  @Output() delete = new EventEmitter<Image>();

  constructor(private router: Router) {}

  ngOnInit() {
    this.setDefaultSite();
  }

  setDefaultSite() {
    this.media.site = { name: 'Desconocido', _id: this.defaultSite };
  }

  goToMedia(slug: string) {
    if (this.media.type === 'set') {
      this.router.navigate([routesConfig.set.replace(':slug', slug)]);
    } else {
      this.router.navigate([routesConfig.track.replace(':slug', slug)]);
    }
  }

  goToYoutube() {
    window.open(
      `https://www.youtube.com/watch?v=${this.media.sourceId!}`,
      '_blank'
    );
  }
}
