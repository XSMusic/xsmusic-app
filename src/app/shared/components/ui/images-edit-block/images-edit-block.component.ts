import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Artist, Image, Media, Site } from '@models';

@Component({
  selector: 'images-edit-block',
  templateUrl: 'images-edit-block.component.html',
})
export class ImagesEditBlockComponent {
  @Input() item!: Artist | Site | Media;
  @Output() showImage = new EventEmitter<string>();
  @Output() removeImage = new EventEmitter<Image>();
  @Output() setFirstImage = new EventEmitter<Image>();
  @Output() toggleAddImage = new EventEmitter<void>();
}
