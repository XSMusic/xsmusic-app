import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Menu } from '@models';

@Component({
  selector: 'navbar-mobile-menu',
  templateUrl: './navbar-mobile-menu.component.html',
  animations: [inOutAnimation],
})
export class NavbarMobileMenuComponent {
  @Input() adminPage = false;
  @Input() menuItemsForAdmin: Menu[] = [];
  @Input() menuItemsForAdminInAdmin: Menu[] = [];
  @Input() menuItemsForAny: Menu[] = [];
  @Output() toggleMenu = new EventEmitter();
}
