import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { User } from '@models';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';

@Component({
  selector: 'users-view-list',
  templateUrl: 'users-view-list.component.html',
  animations: [inOutAnimation]
})
export class UsersViewListComponent {
  @Input() users: User[] = [];
  @Input() loading = true;
  @Output() goToProfile = new EventEmitter<User>();
  @Output() filter = new EventEmitter<{ name: string; value: string }>();
  @Output() onScroll = new EventEmitter<void>();

  constructor(private fullImage: FullImageService) {}

  showImage(image: string) {
    this.fullImage.showImageFull(image);
  }
}
