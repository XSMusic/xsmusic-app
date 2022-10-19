import { Component, ViewChild, OnInit } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';
import { routesConfig } from '@core/config';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  animations: [inOutAnimation],
})
export class NavbarComponent implements OnInit {
  @ViewChild('submenu') menu!: HTMLElement;
  menuState = false;
  searchBarState = false;
  searchPage = false;
  submenuItems: any = [];
  menuItems: { name: string; route: string }[] = [];

  constructor(
    private router: Router,
    private permissionsService: NgxPermissionsService
  ) {}

  ngOnInit(): void {
    this.checkPageSearch();
    this.setMenuItems()
  }

  async setMenuItems() {
    const isAdmin = await this.permissionsService.hasPermission('ADMIN');
    this.menuItems = [
      { name: 'Inicio', route: routesConfig.home },
      { name: 'Artistas', route: routesConfig.artists },
      { name: 'Clubs', route: routesConfig.clubs },
      { name: 'Sets', route: routesConfig.sets },
      { name: 'Tracks', route: routesConfig.tracks },
    ];
    if (isAdmin) {
      this.menuItems.push({ name: 'Admin', route: '/admin'})
    }
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
}
