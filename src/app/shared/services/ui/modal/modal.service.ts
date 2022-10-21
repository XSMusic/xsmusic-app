import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const MODAL_STATE = {
  success: 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200',
  info: 'text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200',
  warning:
    'text-orange-500 bg-orange-100 dark:bg-orange-800 dark:text-orange-200',
  error: 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200',
};

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public showModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public titleModal$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public messageModal$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  public stateModal$: BehaviorSubject<string> = new BehaviorSubject<string>(
    MODAL_STATE.success
  );

  showModal(modalState: string, title: string, message: string): void {
    this.stateModal$.next(modalState);
    this.titleModal$.next(title);
    this.messageModal$.next(message);
    this.showModal$.next(true);
  }

  dismissModal(): void {
    this.showModal$.next(false);
  }
}
