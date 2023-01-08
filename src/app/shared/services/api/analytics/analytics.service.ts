import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs';
import { AnalyticsGetVisitsDto } from './analytics.dto';
import {
    AnalyticsGetEventsWithCategoriesResponse,
    AnalyticsGetVisitsResponse,
} from './analytics.response';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
    url = `${environment.urls.api}/analytics`;
    dates = [
        { name: 'Ayer', value: '1dayAgo' },
        { name: 'Últimos 3 días', value: '3daysAgo' },
        { name: 'Última semana', value: '7daysAgo' },
        { name: 'Últimas 2 semanas', value: '14daysAgo' },
        { name: 'Último mes', value: '30daysAgo' },
        { name: 'Últimos 2 meses', value: '60daysAgo' },
        { name: 'Últimos 3 meses', value: '90daysAgo' },
        { name: 'Últimos 6 meses', value: '180daysAgo' },
        { name: 'Último año', value: '365daysAgo' },
    ];
    constructor(private httpClient: HttpClient) {}

    getDataForVMap(data: AnalyticsGetVisitsDto): Observable<any[]> {
        return this.httpClient
            .post<any[]>(`${this.url}/getDataForVMap`, data)
            .pipe(take(1));
    }

    getVisits(
        data: AnalyticsGetVisitsDto
    ): Observable<AnalyticsGetVisitsResponse[]> {
        return this.httpClient
            .post<AnalyticsGetVisitsResponse[]>(`${this.url}/getVisits`, data)
            .pipe(take(1));
    }

    getEventsWithCategories(
        data: AnalyticsGetVisitsDto
    ): Observable<AnalyticsGetEventsWithCategoriesResponse[]> {
        return this.httpClient
            .post<AnalyticsGetEventsWithCategoriesResponse[]>(
                `${this.url}/getEventsWithCategories`,
                data
            )
            .pipe(take(1));
    }
}
