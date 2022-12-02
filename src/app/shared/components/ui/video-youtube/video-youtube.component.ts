import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { inOutAnimation } from '@core/animations/enter-leave.animations';

@Component({
  selector: 'video-youtube',
  templateUrl: 'video-youtube.component.html',
  animations: [inOutAnimation],
})
export class VideoYoutubeComponent {
  @Input() sourceId!: string;
  @Input() title!: string;
  constructor(private sanitizer: DomSanitizer) {}

  getVideoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.sourceId}`
    );
  }

  getEmbedVideo() {
    return `https://www.youtube.com/embed/${this.sourceId}?autoplay=1`;
  }

  getImageByVideo = () => {
    return `https://img.youtube.com/vi/${this.sourceId}/hqdefault.jpg`;
  };

  srcdoc() {
    return this.sanitizer.bypassSecurityTrustHtml(`
    <style>
          * {
          padding: 0;
          margin: 0;
          overflow: hidden;
          }

          body, html {
            height: 100%;
          }

          img, svg {
            position: absolute;
            width: 100%;
            top: 0;
            bottom: 0;
            margin: auto;
          }

          svg {
            filter: drop-shadow(1px 1px 10px hsl(206.5, 70.7%, 8%));
            transition: all 250ms ease-in-out;
          }

          body:hover svg {
            filter: drop-shadow(1px 1px 10px hsl(206.5, 0%, 10%));
            transform: scale(1.2);
          }
        </style>
        <a href='${this.getEmbedVideo()}'>
          <img src='${this.getImageByVideo()}' alt=''>
          <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='#ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-play-circle'><circle cx='12' cy='12' r='10'></circle><polygon points='10 8 16 12 10 16 10 8'></polygon></svg>
        </a>
        `);
  }
}
