import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '@models';
import { Observable } from 'rxjs';
import { artistMock } from './artists.mock';

@Injectable({ providedIn: 'root' })
export class ArtistService {
  mock = true;
  constructor(private httpClient: HttpClient) {}

  getOneBySlug(slug: string): Observable<Artist> {
    if (!this.mock) {
      return this.httpClient.get<Artist>('url');
    } else {
      return new Observable<Artist>(observer => {
        observer.next(artistMock.find((item)=> item.slug === slug));
      })
    }
  }
}
