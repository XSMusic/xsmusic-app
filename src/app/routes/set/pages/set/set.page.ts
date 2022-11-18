import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Media } from '@models';
import { ToastService, MediaService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { DomSanitizer } from '@angular/platform-browser';
import { routesConfig } from '@core/config';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Share } from '@capacitor/share';

@Component({
  selector: 'page-set',
  templateUrl: 'set.page.html',
  animations: [inOutAnimation],
})
export class SetPage implements OnInit {
  slug!: string;
  media: Media = new Media();
  title = '';
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
        this.setTitleHeader();
      },
      error: (error: any) =>
        this.toastService.showToast(TOAST_STATE.error, error),
    });
  }

  setTitleHeader() {
    let title = '';
    if (this.media.site.name !== 'Desconocido') {
      this.media.artists!.forEach((artist, i) => {
        if (i !== 0) {
          title += ' & ';
        }
        title += artist.name;
      });
      title += ' @ ' + this.media.site.name;
      if (this.media.year !== 0) {
        title += ' ' + this.media.year;
      }
    }
    this.title = title;
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
      await Share.share({
        title: 'See cool stuff',
        text: 'Really awesome thing you need to see right meow',
        url: 'http://ionicframework.com/',
        dialogTitle: 'Share with buddies',
      });
    } catch (error) {
      console.log(error);
      this.toastService.showToast(TOAST_STATE.error, 'Error al compartir');
    }
  }
}
