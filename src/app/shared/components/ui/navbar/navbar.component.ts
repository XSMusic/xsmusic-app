import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent {
  @ViewChild('submenu') menu!: HTMLElement;

  menuItems = [
    { name: 'Inicio', route: '/home' },
    { name: 'Artistas', route: '/artists' },
    { name: 'Temas', route: '/tracks' },
    { name: 'Sets', route: '/sets' },
  ];
  submenuItems = [
    { name: 'Tu perfil' },
    { name: 'Opciones' },
    { name: 'Cerrar sesion' },
  ];
  menuState = false;
  submenuState = false;
}
