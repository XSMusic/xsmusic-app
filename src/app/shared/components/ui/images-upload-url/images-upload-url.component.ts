import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { ShowImageI } from '@interfaces';
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
  @Output() showImage = new EventEmitter<ShowImageI>();
  @Output() uploadImageByUrl = new EventEmitter<string>();
  @Output() uploadImageByFile = new EventEmitter<File>();
  loading = false;
  file!: File;

  showImageUrl(url: string) {
    const image = new Image();
    image.url = url;
    this.showImage.emit({ image, remote: true });
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }
}
