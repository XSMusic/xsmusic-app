import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Youtube } from '@models';
import { ScrapingService, TOAST_STATE, UIService } from '@services';

@Component({
  selector: 'admin-media-add-search-items',
  templateUrl: './admin-media-add-search-items.component.html',
  animations: [inOutAnimation],
})
export class AdminMediaAddSearchItemsComponent {
  @Input() items: Youtube[] = [];
  @Input() itemSelected!: Youtube;
  @Output() selectItem = new EventEmitter<Youtube>();

  constructor(
    private scrapingService: ScrapingService,
    private ui: UIService
  ) {}

  goToYoutube(item: Youtube) {
    window.open(`https://www.youtube.com/watch?v=${item.videoId}`, '_blank');
  }

  createDiscart(id: string) {
    this.scrapingService
      .createDiscart({ value: id, source: 'youtube' })
      .subscribe({
        next: (response) => {
          this.items = this.items.filter(
            (item) => item.videoId !== response.value
          );
        },
        error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
      });
  }
}
