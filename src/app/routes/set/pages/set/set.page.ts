import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Media } from '@models';
import { ToastService, MediaService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { DomSanitizer } from '@angular/platform-browser';
import { routesConfig } from '@core/config';

@Component({
  selector: 'page-set',
  templateUrl: 'set.page.html',
})
export class SetPage implements OnInit {
  slug!: string;
  media: Media = new Media();
  constructor(
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router,
    private mediaService: MediaService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.getItem();
  }

  getItem() {
    this.mediaService.getOne('slug', this.slug).subscribe({
      next: (response) => {
        this.media = response;
      },
      error: (error: any) =>
        this.toastService.showToast(TOAST_STATE.error, error),
    });
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
}
