import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Router, NavigationEnd, Event, RouterEvent } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';
import { Menu, User } from '@models';
import { AuthService } from '@core/auth';
import { routesConfig } from '@core/config';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  animations: [inOutAnimation],
})
export class NavbarComponent implements OnInit {
  @ViewChild('menu') menu!: ElementRef;
  menuState = false;
  menuProfileState = false;
  searchBarState = false;
  searchPage = false;
  menuItemsForAny: Menu[] = [];
  menuItemsForAdmin: Menu[] = [];
  menuItemsForAdminInAdmin: Menu[] = [];
  menuProfileItems: Menu[] = [];
  user!: User;
  homePage = false;
  adminPage = false;
  hidden = false;
  onePage = false;
  backButton = {
    state: false,
    route: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private ngxPermissionsService: NgxPermissionsService
  ) {}

  ngOnInit(): void {
    this.checkPageSearch();
    this.setMenuProfileItems();
    this.setMenuAdmin();
    this.setMenuItems();
    this.authService.user().subscribe((response) => {
      this.user = response;
    });
  }

  async setMenuItems() {
    this.menuItemsForAny = [
      { name: 'Inicio', route: 'home' },
      { name: 'Artistas', route: routesConfig.artists },
      { name: 'Clubs', route: routesConfig.clubs },
      { name: 'Festivales', route: routesConfig.festivals },
      { name: 'Sets', route: routesConfig.sets },
      { name: 'Tracks', route: routesConfig.tracks },
    ];
    this.menuItemsForAdmin = [
      ...this.menuItemsForAny,
      { name: 'Admin', route: 'admin' },
    ];
  }

  setMenuAdmin() {
    this.menuItemsForAdminInAdmin = [
      { name: 'Dashboard', route: routesConfig.admin },
      { name: 'Artistas', route: routesConfig.artistsAdmin },
      { name: 'Clubs', route: routesConfig.clubsAdmin },
      { name: 'Estilos', route: routesConfig.stylesAdmin },
      { name: 'Festivales', route: routesConfig.festivalsAdmin },
      { name: 'Imagenes', route: routesConfig.imagesAdmin },
      { name: 'Sets', route: routesConfig.setsAdmin },
      { name: 'Tracks', route: routesConfig.tracksAdmin },
      { name: 'Volver', route: routesConfig.home },
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
        this.onePage =
          e.url.indexOf('/one/') !== -1 || e.url.indexOf('/profile/') !== -1;
        this.homePage = e.url.indexOf('home') !== -1;
        this.checkBackButton(e);
      });
  }

  checkBackButton(e: any) {
    if (!this.adminPage) {
      this.backButton.state = false;
      this.backButton.route = '';
      const urlSplit = e.url.split('/');
      if (urlSplit.length === 4) {
        if (e.url.includes('artist')) {
          this.setBackButtonRoute(routesConfig.artists);
        } else if (e.url.includes('club')) {
          this.setBackButtonRoute(routesConfig.clubs);
        } else if (e.url.includes('festival')) {
          this.setBackButtonRoute(routesConfig.festivals);
        } else if (e.url.includes('set')) {
          this.setBackButtonRoute(routesConfig.sets);
        } else if (e.url.includes('track')) {
          this.setBackButtonRoute(routesConfig.tracks);
        }
      }
    } else {
      this.backButton.state = false;
      this.backButton.route = '';
    }
  }

  onMenuOrBackButton() {
    if (!this.backButton.state) {
      this.toggleMenu();
    } else {
      this.router.navigate([this.backButton.route]);
    }
  }

  private setBackButtonRoute(route: string) {
    this.backButton.state = true;
    this.backButton.route = route;
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
      this.router.navigate([routesConfig.accountEdit]);
    } else if (item.action === 'logout') {
      this.authService.logout();
      this.router.navigate([routesConfig.home]);
    }
  }

  goToHomeOrAdmin() {
    if (this.homePage) {
      this.router.navigate([routesConfig.admin]);
    } else {
      this.router.navigate([routesConfig.home]);
    }
  }

  toggleMenu() {
    if (document.getElementById('menu')!.classList.contains('hidden')) {
      document.getElementById('menu')!.classList.remove('hidden');
      document.getElementById('menu')!.classList.add('w-full');
      document.getElementById('menu')!.classList.add('h-screen');
    } else {
      document.getElementById('menu')!.classList.add('hidden');
      document.getElementById('menu')!.classList.remove('w-full');
      document.getElementById('menu')!.classList.remove('h-screen');
    }
  }
}
