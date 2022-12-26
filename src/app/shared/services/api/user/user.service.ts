import { Injectable } from '@angular/core';
import { User } from '@models';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, share } from 'rxjs';
import { LocalStorageService } from '@services';

@Injectable({ providedIn: 'root' })
export class UserService {
  private change$ = new BehaviorSubject<User | undefined>(undefined);
  private _user?: User;
  constructor(private localStorageService: LocalStorageService) {}

  private get user(): User | undefined {
    this._user = this.localStorageService.getItem('user')
      ? JSON.parse(this.localStorageService.getItem('user')!)
      : undefined;
    return this._user;
  }

  change(): Observable<User | undefined> {
    return this.change$.pipe(share());
  }

  getUser(): User {
    return this.user!;
  }

  set(user?: User): UserService {
    this.save(user);
    return this;
  }

  clear(): void {
    this.save();
  }

  private save(user?: User): void {
    this._user = undefined;
    if (!user) {
      this.localStorageService.removeItem('user');
    } else {
      this.localStorageService.setItem('user', JSON.stringify(user));
      this._user = user;
    }
    this.change$.next(user);
  }
}
