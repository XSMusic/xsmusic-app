import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Media } from '@models';
import { ToastService, MediaService, MetaService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { routesConfig } from '@core/config';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
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
  imageVideo = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService,
    private mediaService: MediaService,
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
      error: (error: any) => this.toast.showToast(TOAST_STATE.error, error),
    });
  }

  setMeta() {
    const meta: MetadataI = {
      title: getTitleMedia(this.media),
      image: `${environment.urls.images}/${this.media.images![0].url}`,
      url: `${environment.urls.app}${routesConfig.set.replace(
        ':slug',
        this.media.slug!
      )}`,
    };
    if (this.media.info !== '') {
      meta.description = this.media.info;
    }
    this.metaService.setMetaDynamic(meta);
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


}
