import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Add this constant ⤵
export const TOAST_STATE = {
  success: 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200',
  info: 'text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200',
  warning:
    'text-orange-500 bg-orange-100 dark:bg-orange-800 dark:text-orange-200',
  error: 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200',
};

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public showToast$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public toastMessage$: BehaviorSubject<string> = new BehaviorSubject<string>(
    'Default toast message'
  );
  public toastState$: BehaviorSubject<string> = new BehaviorSubject<string>(
    TOAST_STATE.success
  );

  showToast(toastState: string, toastMessage: string): void {
    this.toastState$.next(toastState);
    this.toastMessage$.next(toastMessage);
    this.showToast$.next(true);
  }

  dismissToast(): void {
    this.showToast$.next(false);
  }
}
