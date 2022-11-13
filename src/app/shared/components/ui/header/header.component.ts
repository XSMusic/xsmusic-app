import { Component, Input } from '@angular/core';

@Component({
  selector: 'header-custom',
  templateUrl: 'header.component.html',
})
export class HeaderComponent {
  @Input() title = '';
  @Input() total = 0;
  @Input() breadcrumb = false;
}
