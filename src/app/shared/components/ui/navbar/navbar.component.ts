import { Component, ViewChild, OnInit } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';
import { routesConfig } from '@core/config';

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
  menuItems = [
    { name: 'Inicio', route: routesConfig.home },
    { name: 'Artistas', route: routesConfig.artists },
    { name: 'Sets', route: routesConfig.sets },
    { name: 'Temas', route: routesConfig.tracks },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkPageSearch();
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
