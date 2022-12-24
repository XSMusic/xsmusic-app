import { Component, Input } from '@angular/core';
import { ScrapingService, TOAST_STATE, UIService } from '@services';
import { ScrapingSoundcloudSearchI } from '@shared/services/api/scraping/scraping-soundcloud-search.interface';
import { ScrapingSearchNameYoutubeI } from '@shared/services/api/scraping/scraping-youtube-search.interface';

@Component({
  selector: 'social-inputs',
  templateUrl: 'social-inputs.component.html',
})
export class SocialInputsComponent {
  @Input() type!: 'artist' | 'site';
  @Input() item!: any;
  soundcloudNames: ScrapingSoundcloudSearchI[] = [];
  youtubeNames: ScrapingSearchNameYoutubeI[] = [];
  constructor(
    private scrapingService: ScrapingService,
    private ui: UIService
  ) {}

  searchSoundcloud() {
    this.scrapingService
      .searchNameSoundcloud({ name: this.item.name! })
      .subscribe({
        next: (response) => {
          if (response.length > 1) {
            this.soundcloudNames = response;
          } else if (response.length === 1) {
            this.item.social.soundcloud = response[0].url;
          } else {
            this.ui.toast.showToast(
              TOAST_STATE.warning,
              'No hay ningun usuario con el nombre del artista'
            );
          }
        },
        error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
      });
  }

  searchYoutube() {
    this.scrapingService.searchNameYoutube({ name: this.item.name }).subscribe({
      next: (response) => {
        if (response.length > 1) {
          this.youtubeNames = response;
        } else if (response.length === 1) {
          this.item.social.youtube = `https://www.youtube.com/channel/${response[0].id}`;
        } else {
          this.ui.toast.showToast(
            TOAST_STATE.warning,
            'No hay ningun usuario con el nombre del artista'
          );
        }
      },
      error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
    });
  }

  onSelectSoundcloud(item: ScrapingSoundcloudSearchI) {
    this.item.social.soundcloud = item.url;
    this.soundcloudNames = [];
  }

  onSelectYoutube(item: ScrapingSearchNameYoutubeI) {
    this.item.social.youtube = `https://www.youtube.com/channel/${item.id}`;
    this.youtubeNames = [];
  }
}
