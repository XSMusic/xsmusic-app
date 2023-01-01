import { Component, OnInit } from '@angular/core';
import { UIService, VersionUpdateService } from '@services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  modalVersion = false;

  constructor(
    public versionUpdateService: VersionUpdateService,
    private ui: UIService
  ) {}

  ngOnInit(): void {
    this.ui.navigation.startSaveHistory();
    this.preventBackButton();
    this.setMeta();
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
    this.ui.meta.setMeta();
  }
}
