import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { StatsTotalsAdminI } from '@shared/interfaces/responses/stats.response.interface';
import { Observable } from 'rxjs';
import { StatsGetTopStatsDto } from './stats.dto';
import { StatsGetTopStatsI } from './stats.interface';

@Injectable({ providedIn: 'root' })
export class StatsService {
  url = `${environment.API_URL}/stats`;
  constructor(private httpClient: HttpClient) {}

  getForAdmin(): Observable<StatsTotalsAdminI> {
    return this.httpClient.get<StatsTotalsAdminI>(`${this.url}/getForAdmin`);
  }

  getTopStats(data: StatsGetTopStatsDto): Observable<StatsGetTopStatsI> {
    return this.httpClient.post<StatsGetTopStatsI>(`${this.url}/getTopStats`, data);
  }
}
