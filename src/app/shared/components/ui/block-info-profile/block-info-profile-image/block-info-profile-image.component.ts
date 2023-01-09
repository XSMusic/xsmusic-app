import { Component, Input, OnInit } from '@angular/core';
import { Image } from '@models';
import { UIService } from '@services';
import { GA } from '@shared/services/ui/google-analytics/ga.model';
import { GenericItemAllType } from '@shared/utils';

@Component({
  selector: 'block-info-profile-image',
  templateUrl: 'block-info-profile-image.component.html',
})
export class BlockInfoProfileImageComponent implements OnInit {
  @Input() item: any;
  @Input() type: GenericItemAllType = 'artist';
  class!: string;

  constructor(private ui: UIService) {}

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
    const gaEvent = new GA({ event: 'show_image', one: true, type: this.type });
    this.ui.ga2.event(gaEvent);
    this.ui.fullImage.show({ image });
  }
}
