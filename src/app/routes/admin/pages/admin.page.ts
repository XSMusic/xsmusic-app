import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.page.html',
})
export class AdminPage implements OnInit {

  menu = [
    { name: 'Estilos', route: '/admin/styles' },
    { name: 'Users', route: '/admin/users' },
  ];
  constructor() {}

  ngOnInit() {}
}
