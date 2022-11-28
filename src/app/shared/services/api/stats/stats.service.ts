import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  StatsGetTopArtistsI,
  StatsTotalsAdminI,
} from '@shared/interfaces/responses/stats.response.interface';
import { Observable } from 'rxjs';
import { StatsGetTopArtistsDto } from './stats.dto';
import { StatsArtistsI } from './stats.interface';

@Injectable({ providedIn: 'root' })
export class StatsService {
  url = `${environment.API_URL}/stats`;
  constructor(private httpClient: HttpClient) {}

  getForAdmin(): Observable<StatsTotalsAdminI> {
    return this.httpClient.get<StatsTotalsAdminI>(`${this.url}/getForAdmin`);
  }

  getTopArtists(
    body: StatsGetTopArtistsDto
  ): Observable<StatsGetTopArtistsI[]> {
    return this.httpClient.post<StatsGetTopArtistsI[]>(
      `${this.url}/getTopArtists`,
      body
    );
  }

  getStatsArtists(): Observable<StatsArtistsI> {
    return this.httpClient.get<StatsArtistsI>(`${this.url}/getStatsArtists`);
  }
}
