import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Youtube } from '@models';

@Injectable({ providedIn: 'root' })
export class YoutubeService {
  url = `${environment.API_URL}/youtube`;
  constructor(private httpClient: HttpClient) {}

  search(query: string): Observable<Youtube[]> {
    return this.httpClient.post<Youtube[]>(`${this.url}/search`, {
      query,
    });
  }
}