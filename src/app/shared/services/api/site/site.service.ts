import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Site } from '@models';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { GetAllDto, IdSlugDto, MessageI, PaginatorI } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class SiteService {
  url = `${environment.API_URL}/sites`;
  constructor(private httpClient: HttpClient) {}

  getAll(data: GetAllDto): Observable<PaginatorI<Site>> {
    return this.httpClient.post<PaginatorI<Site>>(`${this.url}/getAll`, data);
  }

  getOne(data: IdSlugDto): Observable<Site> {
    return this.httpClient.post<Site>(`${this.url}/getOne`, data);
  }

  create(data: Site): Observable<MessageI> {
    return this.httpClient.post<MessageI>(`${this.url}/create`, data);
  }

  update(data: Site): Observable<MessageI> {
    return this.httpClient.put<MessageI>(`${this.url}/update`, data);
  }

  deleteOne(id: string): Observable<MessageI> {
    return this.httpClient.delete<MessageI>(`${this.url}/one/${id}`);
  }
}
