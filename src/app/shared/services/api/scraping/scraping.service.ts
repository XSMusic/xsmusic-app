import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  ScrapingGetInfoArtistDto,
  ScrapingGetInfoArtistResponse,
  ScrapingGetInfoClubDto,
  ScrapingGetInfoClubResponse,
} from '@interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrapingService {
  url = `${environment.API_URL}/scraping`;
  constructor(private httpClient: HttpClient) {}

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
}
