import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu, User } from '@models';
import { LoginResponseI } from '@interfaces';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(protected http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponseI> {
    return this.http.post<LoginResponseI>('/auth/login', {
      email,
      password,
    });
  }

  me() {
    return this.http.post<User>('/auth/me', {});
  }

  menu(): Observable<Menu[]> {
    return this.http
      .post<Menu[]>('/menu', { site: 'admin' })
      .pipe(map((res) => res));
  }
}
