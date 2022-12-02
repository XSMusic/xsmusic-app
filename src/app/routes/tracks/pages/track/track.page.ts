import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Media } from '@models';
import { ToastService, MediaService, MetaService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { DomSanitizer } from '@angular/platform-browser';
import { routesConfig } from '@core/config';
import { getTitleMedia } from '@shared/utils';
import { MetadataI } from '@shared/services/system/meta';
import { environment } from '@env/environment';

@Component({
  selector: 'page-track',
  templateUrl: 'track.page.html',
})
export class TrackPage implements OnInit {
  slug!: string;
  media: Media = new Media();
  constructor(
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router,
    private mediaService: MediaService,
    private sanitizer: DomSanitizer,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.getItem();
  }

  getItem() {
    this.mediaService.getOne('slug', this.slug).subscribe({
      next: (response) => {
        this.media = response;
        this.setMeta();
      },
      error: (error: any) =>
        this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  setMeta() {
    const meta: MetadataI = {
      title: `Track - ${getTitleMedia(this.media)}`,
      image: `${environment.IMAGES_URL}/${this.media.images![0].url}`,
      url: `${environment.APP_URL}${routesConfig.track.replace(
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

  goToProfile(slug: string) {
    this.router.navigate([routesConfig.artist.replace(':slug', slug)]);
  }

  goToEdit() {
    this.router.navigate([
      routesConfig.trackAdmin.replace(':id', this.media._id!),
    ]);
  }
}
