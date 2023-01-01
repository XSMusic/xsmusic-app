import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';

@Component({
  selector: 'header-custom',
  templateUrl: 'header.component.html',
  animations: [inOutAnimation],
})
export class HeaderComponent {
  @Input() title = '';
  @Output() onClickTitle = new EventEmitter<void>();
}
