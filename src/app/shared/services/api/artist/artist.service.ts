import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '@models';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { MessageI } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class ArtistService {
  url = `${environment.urls.api}/artists`;
  constructor(private httpClient: HttpClient) {}

  create(data: Artist): Observable<Artist> {
    return this.httpClient.post<Artist>(`${this.url}/create`, data);
  }

  update(data: Artist): Observable<MessageI> {
    return this.httpClient.put<MessageI>(`${this.url}/update`, data);
  }
}
