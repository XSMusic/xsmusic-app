import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { MessageI, PaginatorI } from '@interfaces';
import { Media } from '@models';
import { GetAllDto } from '../api.dtos';

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

  getAllForType(data: GetAllDto): Observable<PaginatorI<Media>> {
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
}
