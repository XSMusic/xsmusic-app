import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '@services';
import { GoToPageI } from '@shared/interfaces/goto.interface';

@Component({
  selector: 'not-found',
  templateUrl: 'not-found.page.html',
  styleUrls: ['./not-found.page.css'],
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
  constructor(
    private router: Router,
    private navigationService: NavigationService
  ) {
    const currentNav = this.router.getCurrentNavigation();
    if (currentNav && currentNav.extras.state) {
      this.type = currentNav.extras.state['type'];
    }
  }

  goToPage(data: GoToPageI) {
    this.navigationService.goToPage(data);
  }
}
