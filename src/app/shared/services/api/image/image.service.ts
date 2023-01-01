import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs';
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

  uploadByFile(data: ImageUploadDto, file: File): Observable<Image> {
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

  setFirstImage(data: ImageSetFirstImageDto): Observable<Image[]> {
    return this.httpClient
      .put<Image[]>(`${this.url}/setFirstImage`, data)
      .pipe(take(1));
  }
}
