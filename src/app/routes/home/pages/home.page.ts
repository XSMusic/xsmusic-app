import { Component } from '@angular/core';
import { themeChange } from 'theme-change';

@Component({
  selector: 'home',
  templateUrl: 'home.page.html',
})
export class HomePage {
  changeTheme() {
    themeChange(true);
  }
}
