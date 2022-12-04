import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs';
import { GetAllDto, MessageI, PaginatorI } from '@interfaces';
import { Image } from '@models';
import {
  ImageSetFirstImageDto,
  ImageUploadByUrlDto,
  ImageUploadDto,
} from './image.dto';

@Injectable({ providedIn: 'root' })
export class ImageService {
  url = `${environment.urls.api}/images`;
  constructor(private httpClient: HttpClient) {}

  getAll(data: GetAllDto): Observable<PaginatorI<Image>> {
    const url = `${this.url}/getAll`;
    return this.httpClient.post<PaginatorI<Image>>(url, data).pipe(take(1));
  }

  getOne(id: string): Observable<Image> {
    const url = `${this.url}/${id}`;
    return this.httpClient.get<Image>(url).pipe(take(1));
  }

  upload(data: ImageUploadDto, file: File): Observable<Image> {
    const url = `${this.url}/upload`;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', data.type);
    formData.append('id', data.id);
    return this.httpClient.post<any>(url, formData).pipe(take(1));
  }

  uploadByUrl(data: ImageUploadByUrlDto): Observable<Image> {
    return this.httpClient
      .post<Image>(`${this.url}/uploadByUrl`, data)
      .pipe(take(1));
  }

  update(data: Image): Observable<any> {
    const url = `${this.url}/update`;
    return this.httpClient.post<any>(url, data).pipe(take(1));
  }

  setFirstImage(data: ImageSetFirstImageDto): Observable<Image[]> {
    return this.httpClient
      .put<Image[]>(`${this.url}/setFirstImage`, data)
      .pipe(take(1));
  }

  deleteOne(id: string): Observable<MessageI> {
    return this.httpClient.delete<MessageI>(`${this.url}/one/${id}`);
  }
}
