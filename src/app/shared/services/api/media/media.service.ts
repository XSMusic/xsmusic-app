import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {
  GetAllDto,
  IdSlugDto,
  MessageI,
  PaginatorI,
  SearchDto,
} from '@interfaces';
import { Media } from '@models';

@Injectable({ providedIn: 'root' })
export class MediaService {
  url = `${environment.API_URL}/media`;
  constructor(private httpClient: HttpClient) {}

  getAll(data: GetAllDto): Observable<PaginatorI<Media>> {
    return this.httpClient.post<PaginatorI<Media>>(`${this.url}/getAll`, data);
  }

  getOne(data: IdSlugDto): Observable<Media> {
    return this.httpClient.post<Media>(`${this.url}/getOne`, data);
  }

  search(data: SearchDto): Observable<Media[]> {
    return this.httpClient.post<Media[]>(`${this.url}/search`, data);
  }

  create(data: Media): Observable<MessageI> {
    return this.httpClient.post<MessageI>(`${this.url}/create`, data);
  }

  update(data: Media): Observable<MessageI> {
    return this.httpClient.put<MessageI>(`${this.url}/update`, data);
  }

  deleteOne(id: string): Observable<MessageI> {
    return this.httpClient.delete<MessageI>(`${this.url}/one/${id}`);
  }
}
