import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ShowImageI } from '@interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FullImageService {
  public showFull$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public imageFull$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  show(data: ShowImageI) {
    if (!data.remote) {
      this.imageFull$.next(
        `${environment.urls.images}/${data.image.type}s/big/${data.image.url}`
      );
    } else {
      this.imageFull$.next(data.image.url!);
    }
    this.showFull$.next(true);
  }

  dismiss() {
    this.showFull$.next(false);
    this.imageFull$.next('');
  }
}
