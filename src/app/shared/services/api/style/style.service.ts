import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Style } from '@models';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IdDto, MessageI, PaginatorI } from '@interfaces';
import { StyleGetAllDto } from './style.dto';

@Injectable({ providedIn: 'root' })
export class StyleService {
  url = `${environment.API_URL}/styles`;
  constructor(private httpClient: HttpClient) {}

  getAll(data: StyleGetAllDto): Observable<PaginatorI<Style>> {
    return this.httpClient.post<PaginatorI<Style>>(`${this.url}/getAll`, data);
  }

  getOneById(data: IdDto): Observable<Style> {
    return this.httpClient.post<Style>(`${this.url}/getOneById`, data);
  }

  create(data: Style): Observable<MessageI> {
    return this.httpClient.post<MessageI>(`${this.url}/create`, data);
  }

  update(data: Style): Observable<MessageI> {
    return this.httpClient.put<MessageI>(`${this.url}/update`, data);
  }

  deleteOne(id: string): Observable<MessageI> {
    return this.httpClient.delete<MessageI>(`${this.url}/one/${id}`);
  }
}
