import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Media } from '@models';
import { ToastService, MediaService, MetaService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { DomSanitizer } from '@angular/platform-browser';
import { routesConfig } from '@core/config';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Share, ShareOptions } from '@capacitor/share';
import { getTitleMedia } from '@shared/utils';
import { environment } from '@env/environment';
import { MetadataI } from '@shared/services/system/meta';

@Component({
  selector: 'page-set',
  templateUrl: 'set.page.html',
  animations: [inOutAnimation],
})
export class SetPage implements OnInit {
  slug!: string;
  media: Media = new Media();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
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
      title: `Set - ${getTitleMedia(this.media)}`,
      image: `${environment.IMAGES_URL}/${this.media.images![0].url}`,
      url: `${environment.APP_URL}${routesConfig.set.replace(
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

  goToProfile(type: 'artist' | 'site', item: any) {
    if (type === 'artist') {
      this.router.navigate([routesConfig.artist.replace(':slug', item.slug)]);
    } else {
      if (item.type === 'club') {
        this.router.navigate([routesConfig.club.replace(':slug', item.slug)]);
      } else if (item.type === 'festival') {
        this.router.navigate([
          routesConfig.festival.replace(':slug', item.slug),
        ]);
      }
    }
  }

  goToEdit() {
    this.router.navigate([
      routesConfig.setAdmin.replace(':id', this.media._id!),
    ]);
  }

  async sharing() {
    try {
      const shareData: ShareOptions = {
        title: getTitleMedia(this.media),
        text: 'Te recomiendo esta sesion',
        url: `${environment.APP_URL}${this.router.url}`,
      };
      await Share.share(shareData);
    } catch (error) {
      this.toastService.showToast(TOAST_STATE.error, 'Error al compartir');
    }
  }
}
