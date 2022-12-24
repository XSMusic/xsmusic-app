import { Component, Input, OnInit } from '@angular/core';
import { Image } from '@models';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { GenericItemAllType } from '@shared/utils';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'block-info-profile-image',
  templateUrl: 'block-info-profile-image.component.html',
})
export class BlockInfoProfileImageComponent implements OnInit {
  @Input() item: any;
  @Input() type: GenericItemAllType = 'artist';
  class!: string;

  constructor(
    private gaService: GoogleAnalyticsService,
    private fullImage: FullImageService
  ) {}

  ngOnInit() {
    if (this.type === 'artist') {
      this.class = 'rounded-full w-52';
    } else if (this.type === 'club' || this.type === 'festival') {
      this.class = 'rounded-2xl w-52';
    } else if (this.type === 'event') {
      this.class = 'h-80 w-100 sm:w-64 mx-3 sm:mx-auto rounded-2xl';
    }
  }

  showImage(image: Image) {
    this.gaService.event(
      `${this.type}_show_image`,
      `${this.type}_show_image`,
      this.type
    );
    this.fullImage.show(image);
  }
}
