import { Component, ViewChild, OnInit } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';
import { Menu, User } from '@models';
import { AuthService } from '@core/auth';
import { routesConfig } from '@core/config';

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
  adminPage = false;
  hidden = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.checkPageSearch();
    this.setMenuProfileItems();
    this.setMenuItems();
    this.authService.user().subscribe((response) => {
      this.user = response;
    });
  }

  async setMenuItems() {
    this.menuItems = [
      { name: 'Inicio', route: 'home' },
      { name: 'Artistas', route: 'artists' },
      { name: 'Clubs', route: 'clubs' },
      { name: 'Sets', route: 'sets' },
      { name: 'Tracks', route: 'tracks' },
    ];
    this.menuItemsAdmin = [
      ...this.menuItems,
      { name: 'Admin', route: 'admin' },
    ];
  }

  setMenuProfileItems() {
    this.menuProfileItems = [
      { name: 'Editar perfil', action: 'accountEdit' },
      { name: 'Cerrar sesion', action: 'logout' },
    ];
  }

  checkPageSearch() {
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe((e: any) => {
        this.adminPage = e.url.indexOf('admin') !== -1;
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
    if (item.action === 'accountEdit') {
      this.router.navigate([`${routesConfig.accountEdit}`]);
    } else if (item.action === 'logout') {
      this.authService.logout();
      this.router.navigate([routesConfig.home]);
    }
  }
}
