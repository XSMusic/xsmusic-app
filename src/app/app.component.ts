import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  modalVersion = false;

  constructor(
    private router: Router,
    private titleService: Title,
    private swUpdate: SwUpdate
  ) {}
  ngOnInit(): void {
    this.preventBackButton();
    this.setTitle();

    console.log(this.swUpdate.isEnabled);
    // if (this.swUpdate.isEnabled) {
    this.swUpdate.versionUpdates.pipe(
      filter(
        (evt: any): evt is VersionReadyEvent => evt.type === 'VERSION_READY'
      ),
      map((evt: any) => {
        console.log(evt);
        console.info(
          `currentVersion=[${evt.currentVersion} | latestVersion=[${evt.latestVersion}]`
        );
        this.modalVersion = true;
      })
    );
    // }
  }

  public updateVersion(): void {
    this.modalVersion = false;
    window.location.reload();
  }

  public closeVersion(): void {
    this.modalVersion = false;
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

  setTitle() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';
          while (route.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data['title']) {
            routeTitle = route.snapshot.data['title'];
          }
          return routeTitle;
        })
      )
      .subscribe((title: string) => {
        if (title) {
          this.titleService.setTitle(`XSMusic - ${title}`);
        }
      });
  }
}
