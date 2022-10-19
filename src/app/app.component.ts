import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private permissionsService: NgxPermissionsService) {}
  ngOnInit(): void {
    this.preventBackButton();
  }

  preventBackButton() {
    window.addEventListener('load', function () {
      window.history.pushState({ noBackExitsApp: true }, '');
    });

    window.addEventListener('popstate', function (event) {
      if (event.state && event.state.noBackExitsApp) {
        window.history.pushState({ noBackExitsApp: true }, '');
      }
    });
  }
}
