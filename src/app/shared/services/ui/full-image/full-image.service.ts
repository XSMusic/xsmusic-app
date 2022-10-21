import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FullImageService {
  public showFull$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public imageFull$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  showImageFull(image: string) {
    this.imageFull$.next(image);
    this.showFull$.next(true);
    console.log('image', image)
  }

  dismissImageFull() {
    this.showFull$.next(false);
    this.imageFull$.next('');
  }
}
