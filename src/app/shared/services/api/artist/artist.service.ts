import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '@models';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { GetAllDto, IdDto, MessageI, PaginatorI, SlugDto } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class ArtistService {
  url = `${environment.API_URL}/artists`;
  constructor(private httpClient: HttpClient) {}

  getAll(data: GetAllDto): Observable<PaginatorI<Artist>> {
    return this.httpClient.post<PaginatorI<Artist>>(`${this.url}/getAll`, data);
  }

  getOneById(data: IdDto): Observable<Artist> {
    return this.httpClient.post<Artist>(`${this.url}/getOneById`, data);
  }

  getOneBySlug(data: SlugDto): Observable<Artist> {
    return this.httpClient.post<Artist>(`${this.url}/getOneBySlug`, data);
  }

  create(data: Artist): Observable<MessageI> {
    return this.httpClient.post<MessageI>(`${this.url}/create`, data);
  }

  update(data: Artist): Observable<MessageI> {
    return this.httpClient.put<MessageI>(`${this.url}/update`, data);
  }

  deleteOne(id: string): Observable<MessageI> {
    return this.httpClient.delete<MessageI>(`${this.url}/deleteOne/${id}`);
  }
}
