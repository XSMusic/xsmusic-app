import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { GetAllDto } from '@interfaces';
import { DynamicForm } from '@models';
import { DynamicFormGetOneDto } from './dynamic-form.dto';

@Injectable({ providedIn: 'root' })
export class DynamicFormService {
  url = `${environment.urls.api}/dynamicForms`;
  constructor(private httpClient: HttpClient) {}

  getAll(data: GetAllDto): Observable<DynamicForm> {
    return this.httpClient.post<DynamicForm>(`${this.url}/getAll`, data);
  }

  getOne(data: DynamicFormGetOneDto): Observable<DynamicForm> {
    return this.httpClient.post<DynamicForm>(`${this.url}/getOne`, data);
  }
}
