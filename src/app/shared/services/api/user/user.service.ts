import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@models';
import { UserCreateFakeDto, UserGetAllDto } from './dtos/user.dto';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, share, take } from 'rxjs';
// import { SearchDto } from '@core/dtos/generic.dto';
import { LocalStorageService } from '@services';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private change$ = new BehaviorSubject<User | undefined>(undefined);
  private _user?: User;
  url = `${environment.API_URL}/users`;
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getAll(data: UserGetAllDto): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/getAll`, data).pipe(take(1));
  }

  // search(data: SearchDto): Observable<User[]> {
  //     return this.httpClient
  //         .post<User[]>(`${this.url}/search`, data)
  //         .pipe(take(1));
  // }

  getOne(id: string): Observable<User> {
    return this.httpClient
      .post<User>(`${this.url}/one`, { id, site: 'admin' })
      .pipe(take(1));
  }

  create(data: User): Observable<User> {
    return this.httpClient.post<User>(`${this.url}/create`, data).pipe(take(1));
  }

  createFake(data: UserCreateFakeDto): Observable<{ message: string }> {
    return this.httpClient
      .post<{ message: string }>(`${this.url}/createFake`, data)
      .pipe(take(1));
  }

  update(data: User): Observable<User> {
    return this.httpClient.put<User>(`${this.url}/update`, data).pipe(take(1));
  }

  delete(id: string): Observable<User> {
    return this.httpClient.delete<User>(`${this.url}/one/${id}`).pipe(take(1));
  }

  deleteAllFake(): Observable<{ message: string }> {
    return this.httpClient
      .delete<{ message: string }>(`${this.url}/allFake`)
      .pipe(take(1));
  }

  private get user(): User | undefined {
    this._user = this.localStorageService.get('user')
      ? JSON.parse(this.localStorageService.get('user')!)
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
      this.localStorageService.remove('user');
    } else {
      this.localStorageService.set('user', JSON.stringify(user));
      this._user = user;
    }
    this.change$.next(user);
  }
}
