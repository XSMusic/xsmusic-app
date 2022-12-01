import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const TOAST_STATE = {
  success: 'bg-white dark:bg-black border border-green-500 text-green-500',
  info: 'bg-white dark:bg-black border border-blue-500 text-blue-500',
  warning: 'bg-white dark:bg-black border border-orange-500 text-orange-500',
  error: 'bg-white dark:bg-black border border-red-500 text-red-500',
};

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public showToast$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public messageToast$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  public stateToast$: BehaviorSubject<string> = new BehaviorSubject<string>(
    TOAST_STATE.success
  );

  showToast(state: string, message: string, duration = 3000): void {
    this.stateToast$.next(state);
    this.messageToast$.next(message);
    this.showToast$.next(true);
    setTimeout(() => this.dismissToast(), duration);
  }

  dismissToast(): void {
    this.showToast$.next(false);
  }
}
