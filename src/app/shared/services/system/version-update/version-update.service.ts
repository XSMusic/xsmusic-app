import { SwUpdate } from '@angular/service-worker';
import { ApplicationRef, Injectable } from '@angular/core';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VersionUpdateService {
  constructor(app: ApplicationRef, updates: SwUpdate) {
    if (updates.isEnabled) {
      updates.versionUpdates.subscribe((response) => {
        console.log(response);
        if (response.type === 'VERSION_READY') {
          if (
            confirm('Hay una nueva versión de XSMusic. ¿Quieres abrirla ahora?')
          ) {
            updates.activateUpdate().then(() => window.location.reload());
          }
        }
      });

      const appIsStable$ = app.isStable.pipe(
        first((isStable) => isStable === true)
      );
      const checkInterval$ = interval(10 * 60 * 1000);
      const everyIntervalOnceAppIsStable$ = concat(
        appIsStable$,
        checkInterval$
      );
      everyIntervalOnceAppIsStable$.subscribe(() => updates.checkForUpdate());
      updates.unrecoverable.subscribe(() => {
        alert(
          'Se ha producido un error y no podemos cargar la aplicación. Por favor, recarga la página para solucionarlo.'
        );
      });
    }
  }
}
