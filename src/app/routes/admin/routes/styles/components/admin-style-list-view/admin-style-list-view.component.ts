import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Style } from '@models';

@Component({
  selector: 'admin-style-list-view',
  templateUrl: 'admin-style-list-view.component.html',
  animations: [inOutAnimation],
})
export class AdminStyleListViewComponent {
  @Input() styles: Style[] = [];
  @Input() loading = true;
  @Output() onScroll = new EventEmitter<void>();
  constructor(private router: Router) {}

  goToOne(id: string) {
    this.router.navigate([routesConfig.styleAdmin.replace(':id', id)]);
  }
}
