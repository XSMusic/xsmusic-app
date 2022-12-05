import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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
      require('leaflet.markercluster');
      // this.Routing = require('leaflet-routing-machine');
    }
  }
}
