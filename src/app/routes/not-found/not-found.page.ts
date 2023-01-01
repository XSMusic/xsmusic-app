import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UIService } from '@services';
import { GoToPageI } from '@shared/interfaces/goto.interface';

@Component({
  selector: 'not-found',
  templateUrl: 'not-found.page.html',
})
export class NotFoundPage {
  type!:
    | 'artist'
    | 'club'
    | 'event'
    | 'eventSite'
    | 'eventScraping'
    | 'set'
    | 'track'
    | 'festival'
    | 'user';
  constructor(private router: Router, private ui: UIService) {
    const currentNav = this.router.getCurrentNavigation();
    if (currentNav && currentNav.extras.state) {
      this.type = currentNav.extras.state['type'];
    }
  }

  goToPage(data: GoToPageI) {
    this.ui.navigation.goToPage(data);
  }
}
