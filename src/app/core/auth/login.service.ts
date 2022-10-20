import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu, User } from '@models';
import { LoginResponseI } from '@interfaces';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  urlAuth = `${environment.API_URL}/auth`;
  urlMenu = `${environment.API_URL}/menu`;
  constructor(protected http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponseI> {
    return this.http.post<LoginResponseI>(`${this.urlAuth}/login`, {
      email,
      password,
    });
  }

  me() {
    return this.http.post<User>(`${this.urlAuth}/me`, {});
  }

  menu(): Observable<Menu[]> {
    return this.http
      .post<Menu[]>(`${this.urlMenu}/menu`, {})
      .pipe(map((res) => res));
  }
}
