import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { PaginatorI } from '@interfaces';
import { Media } from '@models';
import { GetAllDto } from '../api.dtos';

@Injectable({ providedIn: 'root' })
export class MediaService {
  url = `${environment.urls.api}/media`;
  constructor(private httpClient: HttpClient) {}

  getAllForType(data: GetAllDto): Observable<PaginatorI<Media>> {
    return this.httpClient.post<PaginatorI<Media>>(
      `${this.url}/getAllForType`,
      data
    );
  }
}
