import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, take } from 'rxjs';
import { MessageI } from '@interfaces';
import { GithubActionI, GithubIssue, GithubIssueListItemI } from '@services';

@Injectable({ providedIn: 'root' })
export class GithubService {
  url = `${environment.API_URL}/github`;
  constructor(private httpClient: HttpClient) {}

  getAllActions(): Observable<GithubActionI[]> {
    return this.httpClient
      .get<GithubActionI[]>(`${this.url}/actions/all`)
      .pipe(take(1));
  }

  getAllIssues(): Observable<GithubIssueListItemI[]> {
    return this.httpClient
      .get<GithubIssueListItemI[]>(`${this.url}/issues/all`)
      .pipe(take(1));
  }

  create(data: GithubIssue): Observable<MessageI> {
    return this.httpClient
      .post<MessageI>(`${this.url}/issues`, data)
      .pipe(take(1));
  }
}
