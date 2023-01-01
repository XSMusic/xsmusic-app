import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { MessageI } from '@interfaces';
import { ApiTypes } from '@shared/utils';
import { Observable, take } from 'rxjs';
import { GetAllDto, GetOneDto } from './api.dtos';

@Injectable({ providedIn: 'root' })
export class ApiService {
  url = environment.urls.api;
  constructor(private httpClient: HttpClient) {}

  getAll<T>(type: ApiTypes, data: GetAllDto): Observable<T[]> {
    return this.httpClient
      .post<T[]>(`${this.url}/${type}/getAll`, data)
      .pipe(take(1));
  }

  getAllForType<T>(type: ApiTypes, data: GetAllDto): Observable<T[]> {
    return this.httpClient
      .post<T[]>(`${this.url}/${type}/getAllForType`, data)
      .pipe(take(1));
  }

  getOne<T>(type: ApiTypes, data: GetOneDto): Observable<T> {
    return this.httpClient
      .post<T>(`${this.url}/${type}/getOne`, data)
      .pipe(take(1));
  }

  create<T>(type: ApiTypes, data: T): Observable<T> {
    return this.httpClient.post<T>(`${this.url}/${type}/create`, data);
  }

  update<T>(type: ApiTypes, data: T): Observable<T> {
    return this.httpClient.put<T>(`${this.url}/${type}/update`, data);
  }

  deleteOne(type: ApiTypes, id: string): Observable<MessageI> {
    return this.httpClient
      .delete<MessageI>(`${this.url}/${type}/one/${id}`)
      .pipe(take(1));
  }
}
