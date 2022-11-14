import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';

@Component({
  selector: 'images-upload-url',
  templateUrl: './images-upload-url.component.html',
  animations: [inOutAnimation],
})
export class ImagesUploadUrlComponent {
  @Input() image = '';
  @Input() imageState = false;
  @Input() scraping: any;
  @Output() showImage = new EventEmitter<string>();
  @Output() uploadImageByUrl = new EventEmitter<string>();
}
