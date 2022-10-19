import { Component, ViewChild, OnInit } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';
import { routesConfig } from '@core/config';
import { NgxPermissionsService } from 'ngx-permissions';
import { Menu, User } from '@models';
import { AuthService } from '@core/auth';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  animations: [inOutAnimation],
})
export class NavbarComponent implements OnInit {
  @ViewChild('submenu') menu!: HTMLElement;
  menuState = false;
  menuProfileState = false;
  searchBarState = false;
  searchPage = false;
  menuItems: Menu[] = [];
  menuItemsAdmin: Menu[] = [];
  menuProfileItems: Menu[] = [];
  user!: User;

  constructor(
    private router: Router,
    private permissionsService: NgxPermissionsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkPageSearch();
    this.setMenuProfileItems();
    this.setMenuItems();
    this.authService.user().subscribe((response) => {
      this.user = response;
    });
    console.log(this.user);
  }

  async setMenuItems() {
    this.menuItems = [
      { name: 'Inicio', route: routesConfig.home },
      { name: 'Artistas', route: routesConfig.artists },
      { name: 'Clubs', route: routesConfig.clubs },
      { name: 'Sets', route: routesConfig.sets },
      { name: 'Tracks', route: routesConfig.tracks },
    ];
    this.menuItemsAdmin = [
      ...this.menuItems,
      { name: 'Admin', route: 'admin' },
    ];
  }

  setMenuProfileItems() {
    this.menuProfileItems = [{ name: 'Cerrar sesion', action: 'logout' }];
  }

  checkPageSearch() {
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe((e: any) => {
        this.searchPage = e.url.indexOf('search') !== -1;
      });
  }

  openOrCloseMenu() {
    this.menuState = !this.menuState;
    if (this.menuState) {
      this.searchBarState = false;
    }
  }

  openOrCloseSearchBar() {
    this.searchBarState = !this.searchBarState;
    if (this.searchBarState) {
      this.menuState = false;
    }
  }

  onClickMenuProfileItem(item: Menu) {
    this.menuProfileState = false;
    if (item.action === 'logout') {
      this.authService.logout();
    }
  }
}
