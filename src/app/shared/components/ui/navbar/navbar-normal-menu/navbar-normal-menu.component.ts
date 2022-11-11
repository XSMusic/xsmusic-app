import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Menu, User } from '@models';

@Component({
  selector: 'navbar-normal-menu',
  templateUrl: './navbar-normal-menu.component.html',
  animations: [inOutAnimation],
})
export class NavbarNormalMenuComponent {
  @Input() adminPage = false;
  @Input() menuItemsAdmin: Menu[] = [];
  @Input() menuItems: Menu[] = [];
  @Input() menuProfileItems: Menu[] = [];
  @Input() menuProfileState = false;
  @Input() user!: User;
  @Output() toggleMenu = new EventEmitter<void>();
  @Output() goToHomeOrAdmin = new EventEmitter<void>();
  @Output() onClickMenuProfileItem = new EventEmitter<Menu>();
}
