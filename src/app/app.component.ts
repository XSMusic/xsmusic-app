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
  installBlock = false;
  deferredPrompt?: any;

  constructor(
    private router: Router,
    private titleService: Title,
    private swUpdate: SwUpdate
  ) {}
  ngOnInit(): void {
    this.preventBackButton();
    this.setTitle();

    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(
        filter(
          (evt: any): evt is VersionReadyEvent => evt.type === 'VERSION_READY'
        ),
        map((evt: any) => {
          console.info(
            `currentVersion=[${evt.currentVersion} | latestVersion=[${evt.latestVersion}]`
          );
          this.modalVersion = true;
        })
      );
    }
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

  private installPwaEvent() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Previene a la mini barra de información que aparezca en smartphones
      e.preventDefault();
      // Guarda el evento para que se dispare más tarde
      this.deferredPrompt = e;
      // Actualizar la IU para notificarle al usuario que se puede instalar tu PWA
      this.installBlock = true;
      // De manera opcional, envía el evento de analíticos para saber si se mostró la promoción a a instalación del PWA
      console.log(`'beforeinstallprompt' event was fired.`);
    });

    window.addEventListener('appinstalled', () => {
      // Esconder la promoción de instalación de la PWA
      this.installBlock = false;
      // Limpiar el defferedPrompt para que pueda ser eliminado por el recolector de basura
      this.deferredPrompt = null;
      // De manera opcional, enviar el evento de analíticos para indicar una instalación exitosa
      console.log('PWA was installed');
    });
  }

  async onClickInstallPwa() {
    // Esconde la información promotora de la instalación
    this.installBlock = false;
    // Muestre el mensaje de instalación
    this.deferredPrompt.prompt();
    // Espera a que el usuario responda al mensaje
    const { outcome } = await this.deferredPrompt.userChoice;
    // De manera opcional, envía analíticos del resultado que eligió el usuario
    console.log(`User response to the install prompt: ${outcome}`);
    // Como ya usamos el mensaje, no lo podemos usar de nuevo, este es descartado
  }
}
