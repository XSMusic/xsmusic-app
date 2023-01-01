import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, take } from 'rxjs';
import { ResumeGetForAllI } from './resume.interface';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  url = `${environment.urls.api}/resume`;
  constructor(private httpClient: HttpClient) {}

  getForAll(): Observable<ResumeGetForAllI> {
    return this.httpClient
      .post<ResumeGetForAllI>(`${this.url}/getForAll`, null)
      .pipe(take(1));
  }
}
