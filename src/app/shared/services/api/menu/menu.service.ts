import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Menu } from '@models';
import { Observable, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  url = `${environment.API_URL}/menu`;
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Menu[]> {
    return this.httpClient
      .post<Menu[]>(`${this.url}/getAll`, null)
      .pipe(take(1));
  }

  getOne(id: string): Observable<Menu> {
    return this.httpClient
      .post<Menu>(`${this.url}/getOne`, { id, site: 'admin' })
      .pipe(take(1));
  }

  create(data: Menu): Observable<Menu> {
    return this.httpClient.post<Menu>(`${this.url}/create`, data).pipe(take(1));
  }

  update(data: Menu): Observable<Menu> {
    return this.httpClient.put<Menu>(`${this.url}/update`, data).pipe(take(1));
  }

  delete(id: string): Observable<{ message: string }> {
    return this.httpClient
      .delete<{ message: string }>(`${this.url}/one/${id}`)
      .pipe(take(1));
  }
}
