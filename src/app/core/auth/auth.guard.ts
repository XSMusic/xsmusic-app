import { Injectable } from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    Router,
    UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private auth: AuthService, private router: Router) {}

    canActivate() {
        return this.authenticate();
    }

    canActivateChild(): boolean | UrlTree {
        return this.authenticate();
    }

    private authenticate(): boolean | UrlTree {
        return this.auth.check() ? true : this.router.parseUrl('/login');
    }
}
