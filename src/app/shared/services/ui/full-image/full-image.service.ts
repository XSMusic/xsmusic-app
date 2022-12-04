import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FullImageService {
  public showFull$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public imageFull$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  showImageFull(image: string) {
    if (!image.includes('http') && !image.includes('data:')) {
      image = `${environment.urls.images}/${image}`;
    }
    this.imageFull$.next(image);
    this.showFull$.next(true);
  }

  dismissImageFull() {
    this.showFull$.next(false);
    this.imageFull$.next('');
  }
}
