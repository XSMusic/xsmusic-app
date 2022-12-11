import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { environment } from '@env/environment';
import { Media } from '@models';
import { MediaService, MetaService, NavigationService } from '@services';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { MetadataI } from '@shared/services/system/meta';
import { getTitleMedia } from '@shared/utils';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'media-one-base',
  templateUrl: './media-one.base.html',
  animations: [inOutAnimation],
})
export class MediaOneBase implements OnInit {
  @Input() type!: 'set' | 'track';
  slug!: string;
  media: Media = new Media();
  videoWidth = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mediaService: MediaService,
    private metaService: MetaService,
    private navigationService: NavigationService,
    private gaService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.videoWidth = window.innerWidth;
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.getItem();
  }

  getItem() {
    this.mediaService.getOne('slug', this.slug).subscribe({
      next: (response) => {
        this.media = response;
        this.setMeta();
      },
      error: () =>
        this.router.navigate(['/404'], {
          skipLocationChange: true,
          state: {
            type: this.type,
          },
        }),
    });
  }

  setMeta() {
    if (this.type) {
      const meta: MetadataI = {
        title: getTitleMedia(this.media),
        image: `${environment.urls.images}/${this.media.images![0].url}`,
        url: `${environment.urls.app}${routesConfig[this.type].replace(
          ':slug',
          this.media.slug!
        )}`,
      };
      if (this.media.info !== '') {
        meta.description = this.media.info;
      }
      this.metaService.setMetaDynamic(meta);
    }
  }

  goToPage(data: GoToPageI) {
    this.navigationService.goToPage(data);
  }

  goToFilter(key: string, value: string) {
    const type = this.type === 'set' ? 'sets' : 'tracks';
    const route = `${routesConfig[type]}`;
    this.router.navigate([route], {
      queryParams: {
        key,
        value,
      },
    });
    this.gaService.event(
      `${this.type}_filter_${key.toLowerCase()}_${value.toLowerCase()}`,
      `${this.type}_link`,
      `${this.type}`
    );
  }
}
