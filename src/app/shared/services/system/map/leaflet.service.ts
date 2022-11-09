import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class LeafletService {
  public L: any = null;
  public Routing: any = null;

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      this.L = require('leaflet');
      this.Routing = require('leaflet-routing-machine');
    }
  }

  addMarkers(map: L.Map, coordinates: number[]): void {
    const marker = L.marker([coordinates[0], coordinates[1]]);

    marker.addTo(map);
  }
}
