import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, of } from 'rxjs';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { LoginService } from './login.service';
import { Menu, User } from '@models';
import { LoginResponseI } from '@interfaces';
import { UserService } from '@services';

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
        private userService: UserService
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
    }

    user(): Observable<any> {
        return this.user$.pipe(share());
    }

    menu(): Observable<Menu[] | never[]> {
        return iif(() => this.check(), this.loginService.menu(), of([]));
    }

    private assignUser(): any {
        if (!this.check()) {
            return of({}).pipe(
                tap((user: any) => this.user$.next(user)),
                share()
            );
        }
        if (!this.user$.getValue()) {
            return of(this.user$.getValue()).pipe(share());
        }
        return this.loginService.me().pipe(
            tap((user: User) => this.user$.next(user)),
            share()
        );
    }

    // deprecated

    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string {
        return localStorage.getItem('token') as string;
    }

    getUser(): User {
        const data: string = localStorage.getItem('user')!;
        return JSON.parse(data) as User;
    }
}
