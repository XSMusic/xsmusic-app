import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '@models';
import { Observable } from 'rxjs';
import { ArtistGetAllDto } from './artist.dto';
import { environment } from '@env/environment';
import { PaginatorI, SlugDto } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class ArtistService {
  url = `${environment.API_URL}/artists`;
  constructor(private httpClient: HttpClient) {}

  getAll(data: ArtistGetAllDto): Observable<PaginatorI<Artist>> {
    return this.httpClient.post<PaginatorI<Artist>>(`${this.url}/getAll`, data);
  }

  getOneBySlug(data: SlugDto): Observable<Artist> {
    return this.httpClient.post<Artist>(`${this.url}/getOneBySlug`, data);
  }

  update(data: Artist) {
    return this.httpClient.put(`${this.url}/update`, data);
  }
}
