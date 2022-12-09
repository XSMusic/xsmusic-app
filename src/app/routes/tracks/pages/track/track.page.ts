import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Media } from '@models';
import { ToastService, MediaService, MetaService, NavigationService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { DomSanitizer } from '@angular/platform-browser';
import { routesConfig } from '@core/config';
import { getTitleMedia } from '@shared/utils';
import { MetadataI } from '@shared/services/system/meta';
import { environment } from '@env/environment';
import { GoToPageI } from '@shared/interfaces/goto.interface';

@Component({
  selector: 'page-track',
  templateUrl: 'track.page.html',
})
export class TrackPage implements OnInit {
  slug!: string;
  media: Media = new Media();
  videoWidth = 0;
  constructor(
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router,
    private mediaService: MediaService,
    private sanitizer: DomSanitizer,
    private metaService: MetaService,
    private navigationService: NavigationService
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
      error: (error: any) => this.toast.showToast(TOAST_STATE.error, error),
    });
  }

  setMeta() {
    const meta: MetadataI = {
      title: getTitleMedia(this.media),
      image: `${environment.urls.images}/${this.media.images![0].url}`,
      url: `${environment.urls.app}${routesConfig.track.replace(
        ':slug',
        this.media.slug!
      )}`,
    };
    if (this.media.info !== '') {
      meta.description = this.media.info;
    }
    this.metaService.setMetaDynamic(meta);
  }

  getVideoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.media.sourceId}`
    );
  }

  goToPage(data: GoToPageI) {
    this.navigationService.goToPage(data);
  }
}
