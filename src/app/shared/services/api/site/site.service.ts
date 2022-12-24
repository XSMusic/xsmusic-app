import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Site } from '@models';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { MessageI } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class SiteService {
  url = `${environment.urls.api}/sites`;
  constructor(private httpClient: HttpClient) {}

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
