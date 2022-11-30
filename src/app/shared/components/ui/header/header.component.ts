import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';

@Component({
  selector: 'header-custom',
  templateUrl: 'header.component.html',
  animations: [inOutAnimation],
})
export class HeaderComponent {
  @Input() title = '';
  @Input() total = 0;
  @Input() breadcrumb = false;
  @Output() onClickTitle = new EventEmitter<void>();
}
