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
  id!: string;
  media: Media = new Media();
  constructor(
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router,
    private mediaService: MediaService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getItem();
  }

  getItem() {
    this.mediaService.getOne({ id: this.id }).subscribe({
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

  goToArtistProfile(slug: string) {
    this.router.navigate([routesConfig.artist.replace(':slug', slug)]);
  }

  goToEdit() {
    this.router.navigate([routesConfig.setAdmin.replace(':id', this.id)]);
  }
}
