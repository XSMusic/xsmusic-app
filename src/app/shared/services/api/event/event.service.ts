import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '@models';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { PaginatorI } from '@interfaces';
import { GetAllDto } from '../api.dtos';

@Injectable({ providedIn: 'root' })
export class EventService {
  url = `${environment.urls.api}/events`;
  constructor(private httpClient: HttpClient) {}

  getAllForType(data: GetAllDto): Observable<PaginatorI<Event>> {
    return this.httpClient.post<PaginatorI<Event>>(
      `${this.url}/getAllForType`,
      data
    );
  }
}
