import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { GeoCoordinatesToAddressResponseI } from '@interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GeoService {
  url = `${environment.urls.api}/geo`;
  constructor(private httpClient: HttpClient) {}

  addressToCoordinates(address: string): Observable<{ coordinates: number[] }> {
    return this.httpClient.post<{ coordinates: number[] }>(
      `${this.url}/addressToCoordinates`,
      { address }
    );
  }

  coordinatesToAddress(
    coordinates: number[]
  ): Observable<GeoCoordinatesToAddressResponseI> {
    return this.httpClient.post<GeoCoordinatesToAddressResponseI>(
      `${this.url}/coordinatesToAddress`,
      { coordinates }
    );
  }
}
