import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '@services';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class LeafletService {
  public L: any = null;
  public Routing: any = null;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private userService: UserService
  ) {
    if (isPlatformBrowser(platformId)) {
      this.L = require('leaflet');
      require('leaflet.markercluster');
    }
  }

  isDarkMode() {
    let darkMode = false;
    const user = this.userService.getUser();
    if (
      (user && user.darkMode === 'active') ||
      (user &&
        user.darkMode === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      darkMode = true;
    } else if (
      !user &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      darkMode = true;
    }
    return darkMode;
  }

  getMapGoogleNormal() {
    return this.L.tileLayer(
      'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );
  }
  getMapGoogleHybrid() {
    return this.L.tileLayer(
      'https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );
  }

  getDarkMode() {
    return this.L.tileLayer(
      `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png`,
      { maxZoom: 20 }
    );
  }

  getCurrentPosition = async (map: any) => {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const img = `<img style="width:3rem; height:3rem" class="object-cover rounded-full border-black hover:scale-105 hover:duration-1000" src='./assets/images/marker-user.png' />`;

      const icon = this.L.divIcon({
        html: img,
        className: 'image-icon',
        iconSize: [48, 48],
      });

      const marker = this.L.marker(
        [coordinates.coords.latitude, coordinates.coords.longitude],
        { icon }
      );
      marker.addTo(map);
    } catch (e) {
      console.error(e);
    }
  };

}
