import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Style } from '@models';

@Component({
  selector: 'styles-view-list',
  templateUrl: 'styles-view-list.component.html',
  animations: [inOutAnimation],
})
export class StylesViewListComponent {
  @Input() styles: Style[] = [];
  @Input() loading = true;
  @Output() onScroll = new EventEmitter<void>();
  constructor(private router: Router) {}

  goToOne(id: string) {
    this.router.navigate([routesConfig.styleAdmin.replace(':id', id)]);
  }
}
