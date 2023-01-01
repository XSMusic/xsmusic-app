import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Image, Like } from '@models';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';

@Component({
  selector: 'likes-view-list',
  templateUrl: 'likes-view-list.component.html',
  animations: [inOutAnimation],
})
export class LikesListViewComponent {
  @Input() likes: Like[] = [];
  @Input() loading = true;
  @Output() onScroll = new EventEmitter<void>();
  @Output() goToPage = new EventEmitter<GoToPageI>();
  constructor(private router: Router, private fullImage: FullImageService) {}

  showImage(image: Image) {
    this.fullImage.show(image);
  }

  goToOne(id: string) {
    this.router.navigate([routesConfig.likeAdmin.replace(':id', id)]);
  }
}
