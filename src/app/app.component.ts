import { Component, OnInit } from '@angular/core';
import { NavigationService, VersionUpdateService } from '@services';
import { MetaService } from '@shared/services/system/meta/meta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  modalVersion = false;

  constructor(
    public versionUpdateService: VersionUpdateService,
    private navigationService: NavigationService,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.navigationService.startSaveHistory();
    this.preventBackButton();
    this.setMeta();
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
}
