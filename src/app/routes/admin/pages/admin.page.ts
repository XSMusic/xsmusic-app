import { Component } from '@angular/core';

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.page.html',
})
export class AdminPage {
  menu = [
    { name: 'Estilos', route: '/admin/styles' },
    { name: 'Users', route: '/admin/users' },
  ];
}
