import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@models';
import { UserCreateFakeDto, UserGetAllDto } from './dtos/user.dto';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, share, take } from 'rxjs';
import { LocalStorageService } from '@services';
import { environment } from '@env/environment';
import { IdDto, MessageI } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class UserService {
  private change$ = new BehaviorSubject<User | undefined>(undefined);
  private _user?: User;
  url = `${environment.urls.api}/users`;
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getAll(data: UserGetAllDto): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/getAll`, data).pipe(take(1));
  }

  getOne(body: IdDto): Observable<User> {
    return this.httpClient.post<User>(`${this.url}/one`, body).pipe(take(1));
  }

  create(data: User): Observable<MessageI> {
    return this.httpClient
      .post<MessageI>(`${this.url}/create`, data)
      .pipe(take(1));
  }

  createFake(data: UserCreateFakeDto): Observable<{ message: string }> {
    return this.httpClient
      .post<{ message: string }>(`${this.url}/createFake`, data)
      .pipe(take(1));
  }

  update(data: User): Observable<MessageI> {
    return this.httpClient
      .put<MessageI>(`${this.url}/update`, data)
      .pipe(take(1));
  }

  deleteOne(id: string): Observable<MessageI> {
    return this.httpClient
      .delete<MessageI>(`${this.url}/one/${id}`)
      .pipe(take(1));
  }

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
    console.log(user);
  }
}
