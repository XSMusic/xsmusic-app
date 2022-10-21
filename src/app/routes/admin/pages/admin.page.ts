import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.page.html',
})
export class AdminPage implements OnInit {
  tempButtons = [
    { name: 'Estilos', route: 'styles' },
    { name: 'Users', route: 'users' },
  ];
  constructor() {}

  ngOnInit() {}
}
