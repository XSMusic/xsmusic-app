import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { MessageI, PaginatorI } from '@interfaces';
import { ApiTypes } from '@shared/utils';
import { Observable, take } from 'rxjs';
import { GetAllDto, GetOneDto } from './api.dtos';

@Injectable({ providedIn: 'root' })
export class ApiService {
  url = environment.urls.api;
  constructor(private httpClient: HttpClient) {}

  getAll<T>(type: ApiTypes, data: GetAllDto): Observable<PaginatorI<T>> {
    return this.httpClient
      .post<PaginatorI<T>>(`${this.url}/${type}/getAll`, data)
      .pipe(take(1));
  }

  getOne<T>(type: ApiTypes, data: GetOneDto): Observable<T> {
    return this.httpClient
      .post<T>(`${this.url}/${type}/getOne`, data)
      .pipe(take(1));
  }

  deleteOne(type: ApiTypes, id: string): Observable<MessageI> {
    return this.httpClient
      .delete<MessageI>(`${this.url}/${type}/one/${id}`)
      .pipe(take(1));
  }
}
