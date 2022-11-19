import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Youtube } from '@models';
import { YoutubeSearchDto } from './youtube.dto';

@Injectable({ providedIn: 'root' })
export class YoutubeService {
  url = `${environment.API_URL}/youtube`;
  constructor(private httpClient: HttpClient) {}

  searchByText(body: YoutubeSearchDto): Observable<Youtube[]> {
    return this.httpClient.post<Youtube[]>(`${this.url}/searchByText`, body);
  }

  searchByUrl(query: string): Observable<Youtube[]> {
    return this.httpClient.post<Youtube[]>(`${this.url}/searchByUrl`, {
      query,
    });
  }
}
