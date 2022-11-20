import { Component } from '@angular/core';

@Component({
  selector: 'page-admin-dashboard',
  templateUrl: 'admin-dashboard.page.html',
})
export class AdminDashboardPage {
  menu = [
    { name: 'Estilos', route: '/admin/styles' },
    { name: 'Users', route: '/admin/users' },
  ];
}
