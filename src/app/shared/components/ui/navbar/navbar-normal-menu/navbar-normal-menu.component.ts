import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Menu, User } from '@models';

@Component({
  selector: 'navbar-normal-menu',
  templateUrl: './navbar-normal-menu.component.html',
  animations: [inOutAnimation],
})
export class NavbarNormalMenuComponent implements OnInit {
  @Input() adminPage = false;
  @Input() menuProfileItems: Menu[] = [];
  @Input() menuItemsForAny: Menu[] = [];
  @Input() menuItemsForAdmin: Menu[] = [];
  @Input() menuItemsForAdminInAdmin: Menu[] = [];
  @Input() menuProfileState = false;
  @Input() user!: User;
  @Output() toggleMenu = new EventEmitter<void>();
  @Output() goToHomeOrAdmin = new EventEmitter<void>();
  @Output() onClickMenuProfileItem = new EventEmitter<Menu>();
  offline = false;

  ngOnInit(): void {
    window.addEventListener('online', this.onNetworkStatusChange.bind(this));
    window.addEventListener('offline', this.onNetworkStatusChange.bind(this));
  }

  onNetworkStatusChange(): void {
    this.offline = !navigator.onLine;
  }
}
