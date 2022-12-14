import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Image } from '@models';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FullImageService {
  public showFull$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public imageFull$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  show(image: Image) {
    this.imageFull$.next(
      `${environment.urls.images}/${image.type}s/big/${image.url}`
    );
    this.showFull$.next(true);
  }

  dismiss() {
    this.showFull$.next(false);
    this.imageFull$.next('');
  }
}
