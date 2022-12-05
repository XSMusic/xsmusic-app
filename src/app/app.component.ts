import { Component, OnInit } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { NavigationService } from '@services';
import { MetaService } from '@shared/services/system/meta/meta.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  modalVersion = false;

  constructor(
    private swUpdate: SwUpdate,
    private navigationService: NavigationService,
    private metaService: MetaService
  ) {}
  ngOnInit(): void {
    this.navigationService.startSaveHistory();
    this.preventBackButton();
    this.setMeta();
    this.checkUpdate();
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

  setMeta() {
    this.metaService.setMeta();
  }

  checkUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe({
        next: (res) => {
          if (res.type === 'VERSION_READY') {
            this.modalVersion = true;
          }
        },
      });
    }
  }
}
