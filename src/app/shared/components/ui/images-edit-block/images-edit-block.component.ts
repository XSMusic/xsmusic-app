import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Artist, Event, Image, Media, Site, User } from '@models';

@Component({
  selector: 'images-edit-block',
  templateUrl: 'images-edit-block.component.html',
})
export class ImagesEditBlockComponent {
  @Input() item!: Artist | Site | Media | Event | User;
  @Output() showImage = new EventEmitter<Image>();
  @Output() removeImage = new EventEmitter<Image>();
  @Output() setFirstImage = new EventEmitter<Image>();
  @Output() toggleAddImage = new EventEmitter<void>();
}
