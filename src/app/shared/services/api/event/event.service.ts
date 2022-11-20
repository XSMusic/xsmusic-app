import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '@models';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { GetAllDto, MessageI, PaginatorI } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class EventService {
  url = `${environment.API_URL}/events`;
  constructor(private httpClient: HttpClient) {}

  getAll(data: GetAllDto): Observable<PaginatorI<Event>> {
    return this.httpClient.post<PaginatorI<Event>>(`${this.url}/getAll`, data);
  }

  getOne(type: 'id' | 'slug', data: string): Observable<Event> {
    const url = `${this.url}/getOne/${type}/${data}`;
    return this.httpClient.get<Event>(url);
  }

  create(data: Event): Observable<Event> {
    return this.httpClient.post<Event>(`${this.url}/create`, data);
  }

  update(data: Event): Observable<MessageI> {
    return this.httpClient.put<MessageI>(`${this.url}/update`, data);
  }

  deleteOne(id: string): Observable<MessageI> {
    return this.httpClient.delete<MessageI>(`${this.url}/one/${id}`);
  }
}
