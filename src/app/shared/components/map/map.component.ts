import { AfterViewInit, Component, Input } from '@angular/core';
import { Site } from '@models';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from '@env/environment';

@Component({
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['./map.component.css'],
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
  popup = L.popup();

  ngAfterViewInit(): void {
    this.initMap();
    this.getCurrentPosition();
  }

  private initMap(): void {
    const center =
      this.markers.length === 1
        ? this.markers[0].address.coordinates
        : this.center;
    this.map = L.map('map', {
      center,
      attributionControl: true,
      zoom: this.zoom,
      layers: [this.getMapGoogleHybrid(), this.getMapGoogleNormal()],
    });

    // this.addTiles();
    const baseMaps = {
      Normal: this.getMapGoogleNormal(),
      Hibrido: this.getMapGoogleHybrid(),
    };
    L.control.layers(baseMaps).addTo(this.map);

    this.addMakers();
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

        const customPopup = `
        <div class='flex gap-3 w-50'>
          <img src='${environment.IMAGES_URL}/${
          site.images![0].url
        }' alt='' class="object-cover h-20 w-20 rounded-lg"/>
          <div class='flex-col gap-2'>
            <div class='text-lg font-extrabold'>${site.name}</div>
            <div class='font-light'>${site.address.street}, ${
          site.address.town !== '' ? site.address.town : site.address.state
        }
            </div>
            <div class="text-black"><a href="clubs/one/${
              site.slug
            }" class="cursor-pointer text-black font-bold">
              Ver perfil
            </a></div>
          </div>
        </div>`;

        // specify popup options
        const customOptions = {
          maxWidth: 500,
          closeButton: true,
          autoClose: true,
        };

        const marker = L.marker(site.address.coordinates, {
          icon,
          draggable: this.dragabble,
        }).bindPopup(customPopup, customOptions);
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
}
