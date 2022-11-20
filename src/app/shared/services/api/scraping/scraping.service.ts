import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  ScrapingGetInfoArtistResponse,
  ScrapingGetInfoClubResponse,
} from '@interfaces';
import { Youtube } from '@models';
import { Observable } from 'rxjs';
import { ScrapingSourceI } from './scraping-source.interface';
import {
  ScrapingGetInfoArtistDto,
  ScrapingGetInfoClubDto,
  ScrapingGetListMediaDto,
} from './scraping.dto';

@Injectable({ providedIn: 'root' })
export class ScrapingService {
  url = `${environment.API_URL}/scraping`;
  constructor(private httpClient: HttpClient) {}

  getSources(type: string): ScrapingSourceI[] {
    if (type === 'media') {
      return [
        { name: 'Youtube', value: 'youtube' },
        { name: 'Soundcloud', value: 'soundcloud' },
      ];
    } else {
      return [];
    }
  }

  getInfoArtist(
    data: ScrapingGetInfoArtistDto
  ): Observable<ScrapingGetInfoArtistResponse> {
    return this.httpClient.post<ScrapingGetInfoArtistResponse>(
      `${this.url}/getInfoArtist`,
      data
    );
  }

  getInfoClub(
    data: ScrapingGetInfoClubDto
  ): Observable<ScrapingGetInfoClubResponse> {
    return this.httpClient.post<ScrapingGetInfoClubResponse>(
      `${this.url}/getInfoClub`,
      data
    );
  }

  getListMedia(body: ScrapingGetListMediaDto): Observable<Youtube[]> {
    return this.httpClient.post<Youtube[]>(`${this.url}/getListMedia`, body);
  }
}
