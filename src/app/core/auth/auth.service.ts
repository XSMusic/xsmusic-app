import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { User } from '@models';
import { LoginResponseI } from '@interfaces';
import { UserService } from '@services';
import { NgxPermissionsService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlAuth = `${environment.API_URL}/auth`;
  private user$ = new BehaviorSubject({});
  private change$ = this.tokenService
    .change()
    .pipe(switchMap(() => this.assignUser()));

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private permissionService: NgxPermissionsService,
    protected http: HttpClient
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
    return this.http
      .post<LoginResponseI>(`${this.urlAuth}/login`, {
        email,
        password,
      })
      .pipe(
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

  me() {
    return this.http.post<User>(`${this.urlAuth}/me`, {});
  }

  private assignUser() {
    if (!this.check()) {
      return of(new User()).pipe(tap((user) => this.user$.next(user)));
    }
    if (!this.user$.getValue()) {
      return of(this.user$.getValue()).pipe(share());
    }
    return this.me().pipe(tap((user) => this.user$.next(user)));
  }
}
