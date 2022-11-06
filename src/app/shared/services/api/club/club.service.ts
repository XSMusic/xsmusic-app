import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Club } from '@models';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { GetAllDto, IdSlugDto, MessageI, PaginatorI } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class ClubService {
  url = `${environment.API_URL}/clubs`;
  constructor(private httpClient: HttpClient) {}

  getAll(data: GetAllDto): Observable<PaginatorI<Club>> {
    return this.httpClient.post<PaginatorI<Club>>(`${this.url}/getAll`, data);
  }

  getOne(data: IdSlugDto): Observable<Club> {
    return this.httpClient.post<Club>(`${this.url}/getOne`, data);
  }

  create(data: Club): Observable<MessageI> {
    return this.httpClient.post<MessageI>(`${this.url}/create`, data);
  }

  update(data: Club): Observable<MessageI> {
    return this.httpClient.put<MessageI>(`${this.url}/update`, data);
  }

  deleteOne(id: string): Observable<MessageI> {
    return this.httpClient.delete<MessageI>(`${this.url}/one/${id}`);
  }
}
