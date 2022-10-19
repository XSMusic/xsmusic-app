import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '@models';
import { map, Observable, of } from 'rxjs';
import { artistMock } from './artists.mock';

@Injectable({ providedIn: 'root' })
export class ArtistService {
  mock = true;
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Artist[]> {
    return this.httpClient.get<Artist[]>('assets/json/artists.json');
  }

  getOneBySlug(slug: string) {
      return this.httpClient
        .get<Artist[]>('assets/json/artists.json')
        .pipe(map((items) => items.find((item) => item.slug === slug)!)!)!
  }
}
