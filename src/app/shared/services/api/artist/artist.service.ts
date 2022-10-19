import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '@models';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArtistService {
  mock = true;
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Artist[]> {
    return this.httpClient.get<Artist[]>('assets/data/artists.json');
  }

  getOneBySlug(slug: string) {
     return this.getAll()
        .pipe(map((items) => items.find((item) => item.slug === slug)!)!)!
  }
}
