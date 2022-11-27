import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModalButtonI } from './modal.interface';

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
  showModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  titleModal$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  messageModal$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  buttonsModal$: BehaviorSubject<ModalButtonI[]> = new BehaviorSubject<
    ModalButtonI[]
  >([]);
  stateModal$: BehaviorSubject<string> = new BehaviorSubject<string>(
    MODAL_STATE.success
  );

  onDismiss = new BehaviorSubject<string | boolean>('');

  showModal(
    modalState: string,
    title: string,
    message: string,
    buttons?: ModalButtonI[]
  ): Observable<string | boolean> {
    this.stateModal$.next(modalState);
    this.titleModal$.next(title);
    this.messageModal$.next(message);
    this.buttonsModal$.next(buttons ?? []);
    this.showModal$.next(true);
    return this.onDismiss;
  }

  dismissModal(action?: string | boolean): void {
    if (action !== undefined) {
      this.onDismiss.next(action);
      this.onDismiss.next('');
    }
    this.showModal$.next(false);
  }
}
