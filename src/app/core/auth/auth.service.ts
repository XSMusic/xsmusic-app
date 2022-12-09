import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { User } from '@models';
import { LoginResponseI, MessageI } from '@interfaces';
import { UserService } from '@services';
import { NgxPermissionsService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from '@angular/fire/auth';
import { LoginEmailDto } from './login.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlAuth = `${environment.urls.api}/auth`;
  private user$ = new BehaviorSubject({});
  private change$ = this.tokenService
    .change()
    .pipe(switchMap(() => this.assignUser()));

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private permissionService: NgxPermissionsService,
    private auth: Auth,
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

  loginEmail(data: LoginEmailDto): Observable<boolean> {
    return this.http.post<LoginResponseI>(`${this.urlAuth}/login`, data).pipe(
      tap(this.tapOnLogin()),
      map(() => this.check())
    );
  }

  async loginGoogle() {
    const data: UserCredential = await signInWithPopup(
      this.auth,
      new GoogleAuthProvider()
    );

    return this.http
      .post<LoginResponseI>(`${this.urlAuth}/loginGoogle`, data.user)
      .pipe(
        tap(this.tapOnLogin()),
        map(() => this.check())
      );
  }

  tapOnLogin() {
    return (item: LoginResponseI) => {
      this.tokenService.set(item.token);
      this.userService.set(item.user);
    };
  }

  logout(): void {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
    this.tokenService.clear();
    this.userService.clear();
    this.permissionService.flushPermissions();
  }

  user(): Observable<any> {
    return this.user$.pipe(share());
  }

  me() {
    return this.http.post<User>(`${this.urlAuth}/me`, null);
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

  forgottenPassword(email: string): Observable<MessageI> {
    return this.http.post<MessageI>(
      `${this.urlAuth}/sendPasswordResetEmail/${email}`,
      null
    );
  }

  resetPassword(userId: string, token: string, password: string) {
    return this.http.post<MessageI>(
      `${this.urlAuth}/resetPassword/${userId}/${token}`,
      { password }
    );
  }
}
