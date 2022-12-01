import { AfterViewInit, Component, Input } from '@angular/core';
import { Site } from '@models';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from '@env/environment';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Router } from '@angular/router';
import { UserService } from '@services';

@Component({
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['./map.component.css'],
  animations: [inOutAnimation],
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  @Input() center: L.LatLngExpression = [
    40.417244274063485, -3.7021285218467663,
  ];
  @Input() class = '';
  @Input() style = '';
  @Input() zoom = 13;
  @Input() markers: Site[] = [];
  @Input() dragabble = false;
  @Input() one = false;
  popup = L.popup();
  site = new Site();

  constructor(private router: Router, private userService: UserService) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.getCurrentPosition();
    this.setEvents();
  }

  private initMap(): void {
    const center =
      this.markers.length === 1
        ? this.markers[0].address.coordinates
        : this.center;
    const darkMode = this.isDarkMode();
    const layers = !darkMode
      ? [this.getMapGoogleNormal()]
      : [this.getDarkMode()];
    this.map = L.map('map', {
      center,
      attributionControl: true,
      zoom: this.zoom,
      layers,
    });

    const baseMaps = {
      Normal: this.getMapGoogleNormal(),
      Hibrido: this.getMapGoogleHybrid(),
      Oscuro: this.getDarkMode(),
    };
    L.control.layers(baseMaps).addTo(this.map);

    this.addMakers();
  }

  isDarkMode() {
    let darkMode = false;
    const user = this.userService.getUser();
    if (user && user.darkMode === 'active') {
      darkMode = true;
    } else if (
      user &&
      user.darkMode === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
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
    return L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    });
  }
  getMapGoogleHybrid() {
    return L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    });
  }

  getDarkMode() {
    return L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 20,
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      }
    );
  }

  addMakers() {
    const markers = L.markerClusterGroup({
      removeOutsideVisibleBounds: false,
      showCoverageOnHover: false,
      animate: true,
    });
    for (const site of this.markers) {
      if (site.address && site.address.coordinates.length > 0) {
        const img = `<img style="width:3rem; height:3rem" class="object-cover rounded-full border hover:scale-105 hover:duration-1000" src='${
          environment.IMAGES_URL
        }/${site.images![0].url}' />`;

        const icon = L.divIcon({
          html: img,
          className: 'image-icon',
          iconSize: [48, 48],
        });

        const marker = L.marker(site.address.coordinates, {
          icon,
          title: site._id,
          draggable: this.dragabble,
        }).on('click', (e) => {
          if (!this.one) {
            this.site = this.markers.find(
              (item) => item._id === e.target.options.title
            )!;
          }
        });
        markers.addLayer(marker);
      }
      markers.addTo(this.map);
    }
  }

  getCurrentPosition = async () => {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const img = `<img style="width:3rem; height:3rem" class="object-cover rounded-full border-black hover:scale-105 hover:duration-1000" src='./assets/images/marker-user.png' />`;

      const icon = L.divIcon({
        html: img,
        className: 'image-icon',
        iconSize: [48, 48],
      });

      const marker = L.marker(
        [coordinates.coords.latitude, coordinates.coords.longitude],
        { icon }
      );
      marker.addTo(this.map);
    } catch (e) {
      console.error(e);
    }
  };

  setEvents() {
    this.map.on('click', () => {
      if (!this.dragabble) {
        this.site = new Site();
      }
    });
  }

  goToSite() {
    const route =
      this.site.type === 'club' ? routesConfig.club : routesConfig.festival;
    this.router.navigate([route.replace(':slug', this.site.slug!)]);
  }
}
