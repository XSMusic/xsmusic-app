import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { GetAllDto, MessageI, PaginatorI } from '@interfaces';
import { Media } from '@models';
import { ApiGenericBody } from '../api-generic-body';

@Injectable({ providedIn: 'root' })
export class MediaService {
  url = `${environment.urls.api}/media`;
  constructor(private httpClient: HttpClient) {}

  getAll(data: GetAllDto): Observable<PaginatorI<Media>> {
    return this.httpClient.post<PaginatorI<Media>>(
      `${this.url}/getAll/${data.type}`,
      data
    );
  }

  getAllForType(data: ApiGenericBody): Observable<PaginatorI<Media>> {
    return this.httpClient.post<PaginatorI<Media>>(
      `${this.url}/getAllForType`,
      data
    );
  }

  getOne(type: 'id' | 'slug', data: string): Observable<Media> {
    const url = `${this.url}/getOne/${type}/${data}`;
    return this.httpClient.get<Media>(url);
  }

  create(data: Media): Observable<Media> {
    return this.httpClient.post<Media>(`${this.url}/create`, data);
  }

  update(data: Media): Observable<MessageI> {
    return this.httpClient.put<MessageI>(`${this.url}/update`, data);
  }

  deleteOne(id: string): Observable<MessageI> {
    return this.httpClient.delete<MessageI>(`${this.url}/one/${id}`);
  }
}
