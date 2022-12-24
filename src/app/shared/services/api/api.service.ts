import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { PaginatorI } from '@interfaces';
import { ApiAllTypes } from '@shared/utils';
import { Observable, of } from 'rxjs';
import { ApiGenericBody } from './api-generic-body';

@Injectable({ providedIn: 'root' })
export class ApiService {
  types = ['artists', 'events', 'sites', 'media', 'users'];
  url = environment.urls.api;
  constructor(private httpClient: HttpClient) {}

  getAll<T>(
    type: ApiAllTypes,
    data: ApiGenericBody
  ): Observable<PaginatorI<T>> {
    if (this.checkType(type)) {
      return this.httpClient.post<PaginatorI<T>>(
        `${this.url}/${type}/getAll`,
        data
      );
    } else {
      return of();
    }
  }

  checkType(type: ApiAllTypes) {
    if (this.types.includes(type)) {
      return type;
    } else {
      return null;
    }
  }
}
