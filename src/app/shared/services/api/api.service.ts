import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { PaginatorI } from '@interfaces';
import { ApiTypes } from '@shared/utils';
import { Observable } from 'rxjs';
import { GetAllDto, GetOneDto } from './api.dtos';

@Injectable({ providedIn: 'root' })
export class ApiService {
  url = environment.urls.api;
  constructor(private httpClient: HttpClient) {}

  getAll<T>(type: ApiTypes, data: GetAllDto): Observable<PaginatorI<T>> {
    return this.httpClient.post<PaginatorI<T>>(
      `${this.url}/${type}/getAll`,
      data
    );
  }

  getOne<T>(type: ApiTypes, data: GetOneDto): Observable<T> {
    return this.httpClient.post<T>(`${this.url}/${type}/getOne`, data);
  }
}
