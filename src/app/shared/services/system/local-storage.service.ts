/* eslint-disable @typescript-eslint/no-unused-vars */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  [name: string]: any;
  length!: number;
  private readonly isBrowser;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(BROWSER_STORAGE) public storage: Storage
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  clear(): void {
    this.storage.clear();
  }

  get(key: string): string | null {
    return this.isBrowser ? this.storage.getItem(key) : null;
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  remove(key: string): void {
    return this.storage.removeItem(key);
  }

  set(key: string, value: string): void {
    return this.storage.setItem(key, value);
  }
}
