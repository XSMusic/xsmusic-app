import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { StatsTotalsAdminResponseI } from '@shared/interfaces/responses/stats.response.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StatsService {
  url = `${environment.API_URL}/stats`;
  constructor(private httpClient: HttpClient) {}

  getForAdmin(): Observable<StatsTotalsAdminResponseI> {
    return this.httpClient.get<StatsTotalsAdminResponseI>(
      `${this.url}/getForAdmin`
    );
  }
}
