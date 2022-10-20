import { Component } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { AuthService } from '@core/auth';

@Component({
  selector: 'home',
  templateUrl: 'home.page.html',
  animations: [inOutAnimation],
})
export class HomePage {
  constructor(private authService: AuthService) {}

  loginUser() {
    this.authService
      .login('manolo@gmail.com', 'manolo')
      .subscribe((response) => {
        console.log(response);
      });
  }

  loginAdmin() {
    this.authService
      .login('xskunk@gmail.com', 'xskunk')
      .subscribe((response) => {
        console.log(response);
      });
  }
}
