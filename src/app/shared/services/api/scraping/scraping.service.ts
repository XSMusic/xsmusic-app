import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  IdDto,
  ScrapingGetInfoArtistResponse,
  ScrapingGetInfoClubResponse,
} from '@interfaces';
import { Youtube } from '@models';
import { Observable } from 'rxjs';
import { ScrapingSoundcloudSearchI } from './scraping-soundcloud-search.interface';
import {
  ScrapingEventI,
  ScrapingEventsI,
  ScrapingSourceI,
} from './scraping-source.interface';
import { ScrapingSearchNameYoutubeI } from './scraping-youtube-search.interface';
import {
  ScrapingGetInfoArtistDto,
  ScrapingGetInfoClubDto,
  ScrapingGetListEventsDto,
  ScrapingGetListMediaDto,
} from './scraping.dto';

@Injectable({ providedIn: 'root' })
export class ScrapingService {
  url = `${environment.urls.api}/scraping`;
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

  searchNameSoundcloud(data: {
    name: string;
  }): Observable<ScrapingSoundcloudSearchI[]> {
    return this.httpClient.post<ScrapingSoundcloudSearchI[]>(
      `${this.url}/searchNameSoundcloud`,
      data
    );
  }

  searchNameYoutube(data: {
    name: string;
  }): Observable<ScrapingSearchNameYoutubeI[]> {
    return this.httpClient.post<ScrapingSearchNameYoutubeI[]>(
      `${this.url}/searchNameYoutube`,
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

  getListEvents(body: ScrapingGetListEventsDto): Observable<ScrapingEventsI> {
    return this.httpClient.post<ScrapingEventsI>(
      `${this.url}/getListEvents`,
      body
    );
  }

  getEventsBySiteId(body: IdDto): Observable<ScrapingEventI[]> {
    return this.httpClient.post<ScrapingEventI[]>(
      `${this.url}/getEventsBySiteId`,
      body
    );
  }

  createDiscart(body: {
    value: string;
    source: string;
  }): Observable<{ value: string; source: string }> {
    return this.httpClient.post<{ value: string; source: string }>(
      `${this.url}/createDiscart`,
      body
    );
  }
}
