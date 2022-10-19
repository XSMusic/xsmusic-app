import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, of } from 'rxjs';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { LoginService } from './login.service';
import { Menu, User } from '@models';
import { LoginResponseI } from '@interfaces';
import { UserService } from '@services';
import { isEmptyObject } from '@shared/utils';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject({});
  private change$ = this.tokenService
    .change()
    .pipe(switchMap(() => this.assignUser()));

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private userService: UserService,
    private permissionService : NgxPermissionsService
  ) {}

  init() {
    return new Promise<void>((resolve) =>
      this.change$.subscribe(() => resolve())
    );
  }

  change() {
    return this.change$;
  }

  check(): boolean {
    return this.tokenService.valid();
  }

  login(email: string, password: string): Observable<boolean> {
    return this.loginService.login(email, password).pipe(
      tap((item: LoginResponseI) => {
        this.tokenService.set(item.token);
        this.userService.set(item.user);
      }),
      map(() => this.check())
    );
  }

  logout(): void {
    this.tokenService.clear();
    this.userService.clear();
    this.permissionService.flushPermissions();
  }

  user(): Observable<any> {
    return this.user$.pipe(share());
  }

  menu(): Observable<Menu[] | never[]> {
    return iif(() => this.check(), this.loginService.menu(), of([]));
  }

  private assignUser() {
    if (!this.check()) {
      return of(new User()).pipe(tap((user) => this.user$.next(user)));
    }
    console.log(this.user$.getValue());
    if (!this.user$.getValue()) {
      return of(this.user$.getValue()).pipe(share());
    }

    return this.loginService.me().pipe(tap((user) => this.user$.next(user)));
  }
}
function isObjectEmpty(arg0: {}) {
  throw new Error('Function not implemented.');
}
