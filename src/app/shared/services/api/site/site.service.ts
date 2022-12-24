import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Site } from '@models';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { MessageI, PaginatorI } from '@interfaces';
import { GetAllDto } from '../api.dtos';

@Injectable({ providedIn: 'root' })
export class SiteService {
  url = `${environment.urls.api}/sites`;
  constructor(private httpClient: HttpClient) {}

  getAll(data: GetAllDto): Observable<PaginatorI<Site>> {
    return this.httpClient.post<PaginatorI<Site>>(
      `${this.url}/getAll/${data.type}`,
      data
    );
  }

  getOne(type: 'id' | 'slug', data: string): Observable<Site> {
    const url = `${this.url}/getOne/${type}/${data}`;
    return this.httpClient.get<Site>(url);
  }

  create(data: Site): Observable<Site> {
    return this.httpClient.post<Site>(`${this.url}/create`, data);
  }

  update(data: Site): Observable<MessageI> {
    return this.httpClient.put<MessageI>(`${this.url}/update`, data);
  }

  deleteOne(id: string): Observable<MessageI> {
    return this.httpClient.delete<MessageI>(`${this.url}/one/${id}`);
  }
}
