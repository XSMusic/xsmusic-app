import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { GetAllDto, PaginatorI } from '@interfaces';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  types = ['artists', 'events', 'sites', 'media', 'users'];
  url = environment.urls.api;
  constructor(private httpClient: HttpClient) {}

  getAll<T>(type: string, data: GetAllDto): Observable<PaginatorI<T>> {
    if (this.checkType(type)) {
      return this.httpClient.post<PaginatorI<T>>(
        `${this.url}/${type}/getAll`,
        data
      );
    } else {
      return of();
    }
  }

  checkType(type: string) {
    if (this.types.includes(type)) {
      return type;
    } else {
      return null;
    }
  }
}
