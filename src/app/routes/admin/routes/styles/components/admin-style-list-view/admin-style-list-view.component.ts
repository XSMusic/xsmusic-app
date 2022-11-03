import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Style } from '@models';

@Component({
  selector: 'admin-style-list-view',
  templateUrl: 'admin-style-list-view.component.html',
  animations: [inOutAnimation]
})
export class AdminStyleListViewComponent {
  @Input() styles: Style[] = [];
  @Input() loading = true;
  @Output() onScroll = new EventEmitter<void>();
}
