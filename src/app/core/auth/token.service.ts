import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { LocalStorageService } from '@services/various/storage.service';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private key = 'XSToken';

    private change$ = new BehaviorSubject<string | undefined>(undefined);

    private _token?: string;

    constructor(private store: LocalStorageService) {}

    private get token(): string | undefined {
        if (!this._token) {
            this._token = this.store.get(this.key)!;
            return this._token;
        } else {
            return this._token;
        }
    }

    change(): Observable<string | undefined> {
        return this.change$.pipe(share());
    }

    set(token?: string): TokenService {
        this.save(token);
        return this;
    }

    clear(): void {
        this.save();
    }

    valid(): boolean {
        if (this.token && this.token.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    getToken(): string {
        return this.token ?? '';
    }

    private save(token?: string): void {
        this._token = undefined;

        if (!token) {
            this.store.remove(this.key);
        } else {
            this.store.set(this.key, token);
            this._token = token;
        }

        this.change$.next(token);
    }
}
