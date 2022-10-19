import { Injectable } from '@angular/core';
import { LoginService } from '@core/auth';
import { LoginResponseI } from '@interfaces';
import { Menu, User } from '@models';
import { admin } from '@utils';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { user } from './shared/utils/user';

/**
 * You should delete this file in the real APP.
 */
@Injectable()
export class FakeLoginService extends LoginService {
  private token = {
    access_token: 'MW56YjMyOUAxNjMuY29tWm9uZ2Jpbg==',
    token_type: 'bearer',
  };

  override login(): Observable<LoginResponseI> {
    return new Observable((obs) => {
      obs.next({ user: admin, token: 'tokenPrueba' });
    });
  }

  override me() {
    console.log('me');
    return of(admin);
  }

  override menu() {
    return this.http
      .get<{ menu: Menu[] }>('assets/data/menu.json?_t=' + Date.now())
      .pipe(map((res) => res.menu));
  }
}
