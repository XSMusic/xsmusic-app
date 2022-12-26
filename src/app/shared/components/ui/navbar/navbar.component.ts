import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';
import { Menu, User } from '@models';
import { AuthService } from '@core/auth';
import { routesConfig } from '@core/config';
import { Location } from '@angular/common';
import { NavigationService } from '@services';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  animations: [inOutAnimation],
})
export class NavbarComponent implements OnInit {
  @ViewChild('menu') menu!: ElementRef;
  menuState = false;
  menuProfileState = false;
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
    private location: Location,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.checkPages();
    this.setMenuProfileItems();
    this.setMenuAdmin();
    this.setMenuItems();
    this.authService.user().subscribe((response) => {
      this.user = response;
    });
  }

  async setMenuItems() {
    this.menuItemsForAny = [
      { name: 'Inicio', route: routesConfig.home },
      { name: 'Artistas', route: routesConfig.artists },
      { name: 'Clubs', route: routesConfig.clubs },
      { name: 'Eventos', route: routesConfig.events },
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
      { name: 'Eventos', route: routesConfig.eventsAdmin },
      { name: 'Festivales', route: routesConfig.festivalsAdmin },
      { name: 'Imagenes', route: routesConfig.imagesAdmin },
      { name: 'Sets', route: routesConfig.setsAdmin },
      { name: 'Tracks', route: routesConfig.tracksAdmin },
      { name: 'Usuarios', route: routesConfig.usersAdmin },
      { name: 'Volver', route: routesConfig.home },
    ];
  }

  setMenuProfileItems() {
    this.menuProfileItems = [
      { name: 'Editar perfil', action: 'accountEdit' },
      { name: 'Cerrar sesion', action: 'logout' },
    ];
  }

  checkPages() {
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe((e: any) => {
        this.adminPage = e.url.indexOf('admin') !== -1;
        this.onePage =
          e.url.indexOf('/one/') !== -1 || e.url.indexOf('/profile/') !== -1;
        this.homePage = e.url.indexOf('home') !== -1;
        this.checkBackButton(e);
      });
  }

  checkBackButton(e: any) {
    if (!this.adminPage) {
      this.checkBackButtonNormal(e);
    } else {
      this.checkBackButtonAdmin(e);
    }
  }

  checkBackButtonNormal(e: any) {
    this.backButton.state = false;
    this.backButton.route = '';
    const urlSplit = e.url.split('/');
    if (urlSplit.length === 3) {
      if (e.url.includes('artist')) {
        this.setBackButtonRoute(routesConfig.artists);
      } else if (e.url.includes('club')) {
        this.setBackButtonRoute(routesConfig.clubs);
      } else if (e.url.includes('event')) {
        this.setBackButtonRoute(routesConfig.events);
      } else if (e.url.includes('festival')) {
        this.setBackButtonRoute(routesConfig.festivals);
      } else if (e.url.includes('set')) {
        this.setBackButtonRoute(routesConfig.sets);
      } else if (e.url.includes('track')) {
        this.setBackButtonRoute(routesConfig.tracks);
      }
    }
  }

  checkBackButtonAdmin(e: any) {
    this.backButton.state = false;
    this.backButton.route = '';
    const urlSplit = e.url.split('/');
    if (urlSplit.length >= 4) {
      if (e.url.includes('artist')) {
        this.setBackButtonRoute(routesConfig.artistsAdmin);
      } else if (e.url.includes('club')) {
        this.setBackButtonRoute(routesConfig.clubsAdmin);
      } else if (e.url.includes('style')) {
        this.setBackButtonRoute(routesConfig.stylesAdmin);
      } else if (e.url.includes('festival')) {
        this.setBackButtonRoute(routesConfig.festivalsAdmin);
      } else if (e.url.includes('set')) {
        this.setBackButtonRoute(routesConfig.setsAdmin);
      } else if (e.url.includes('track')) {
        this.setBackButtonRoute(routesConfig.tracksAdmin);
      } else if (e.url.includes('user')) {
        this.setBackButtonRoute(routesConfig.usersAdmin);
      }
    }
  }

  onMenuOrBackButton() {
    if (!this.backButton.state) {
      this.toggleMenu();
    } else {
      if (this.navigationService.getPreviousUrl()) {
        this.location.back();
      } else {
        this.router.navigate([this.backButton.route]);
      }
    }
  }

  private setBackButtonRoute(route: string) {
    this.backButton.state = true;
    this.backButton.route = route;
  }

  openOrCloseMenu() {
    this.menuState = !this.menuState;
    if (this.menuState) {
      this.menuProfileState = false;
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
