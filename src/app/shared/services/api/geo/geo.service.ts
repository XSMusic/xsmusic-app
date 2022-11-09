import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { GeoCoordinatesToAddressResponseI } from '@interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GeoService {
  url = `${environment.API_URL}/geo`;
  constructor(private httpClient: HttpClient) {}

  addressToCoordinates(address: string): Observable<{ coordinates: number[] }> {
    return this.httpClient.get<{ coordinates: number[] }>(
      `${this.url}/addressToCoordinates/${address}`
    );
  }

  coordinatesToAddress(
    lat: string,
    lng: string
  ): Observable<GeoCoordinatesToAddressResponseI[]> {
    return this.httpClient.get<GeoCoordinatesToAddressResponseI[]>(
      `${this.url}/coordinatesToAddress/${lat}/${lng}`
    );
  }
}
