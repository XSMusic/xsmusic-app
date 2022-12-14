import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'video-youtube',
  templateUrl: './video-youtube.component.html',
})
export class VideoYoutubeComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('demoYouTubePlayer')
  demoYouTubePlayer!: ElementRef<HTMLDivElement>;
  @Input() videoId!: string;
  @Input() width: number | undefined;
  @Input() height: number | undefined;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.width = window.innerWidth;
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  onResize = (): void => {
    this.width = Math.min(
      this.demoYouTubePlayer.nativeElement.clientWidth,
      window.innerWidth!
    );
    this._changeDetectorRef.detectChanges();
  };

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }
}
