import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Image } from '@models';

@Component({
  selector: 'images-upload-url',
  templateUrl: './images-upload-url.component.html',
  animations: [inOutAnimation],
})
export class ImagesUploadUrlComponent {
  @Input() image = '';
  @Input() imageState = false;
  @Input() scraping: any;
  @Output() showImage = new EventEmitter<{ image: Image; remote: true }>();
  @Output() uploadImageByUrl = new EventEmitter<string>();

  showImageUrl(url: string) {
    const image = new Image();
    image.url = url;
    this.showImage.emit({ image, remote: true });
  }
}
