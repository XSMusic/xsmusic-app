import { Component } from '@angular/core';
import { themeChange } from 'theme-change';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
})
export class HomeComponent {

  changeTheme() {
    themeChange(true)
  }
}
