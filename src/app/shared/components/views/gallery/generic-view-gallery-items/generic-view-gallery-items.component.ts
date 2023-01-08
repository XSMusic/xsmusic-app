import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Image, Like } from '@models';
import { UserService } from '@services';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { ApiTypes } from '@shared/utils';

@Component({
  selector: 'generic-view-gallery-items',
  templateUrl: './generic-view-gallery-items.component.html',
  animations: [inOutAnimation],
})
export class GenericViewGalleryItemsComponent {
  @Input() items: any[] = [];
  @Input() type:
    | 'artist'
    | 'club'
    | 'event'
    | 'eventSite'
    | 'eventScraping'
    | 'set'
    | 'track'
    | 'festival' = 'artist';
  @Input() loading = true;
  @Output() goToPage = new EventEmitter<GoToPageI>();
  @Output() discartEvent = new EventEmitter<any>();
  @Output() showImage = new EventEmitter<Image>();
  @Output() likeOrDislike = new EventEmitter<{ type: ApiTypes; like: Like }>();

  constructor(private userService: UserService) {}

  setDataLikeOrDislike(item: any) {
    let type: 'artist' | 'event' | 'media' | 'site';
    if (this.type === 'artist' || this.type === 'event') {
      type = `${this.type}`;
    } else if (this.type === 'club' || this.type === 'festival') {
      type = 'site';
    } else {
      type = 'media';
    }
    const user = this.userService.getUser();
    const like = new Like({ type, [type]: item._id, user });
    this.likeOrDislike.emit({ type: 'likes', like });
  }
}
