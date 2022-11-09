import { AfterViewInit, Component, Input } from '@angular/core';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/images/marker-icon.png';
const iconUrl = 'assets/images/marker-icon.png';
const shadowUrl = 'assets/images/marker-shadow.png';

@Component({
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements AfterViewInit {
  private map: any;
  @Input() lat = 40.3053858;
  @Input() lng = -3.8712108;
  @Input() titulo = 'prueba marker';

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: 13,
    });

    console.log(this.map)

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);

    const iconDefault = L.icon({ iconRetinaUrl, iconUrl });
    L.Marker.prototype.options.icon = iconDefault;

    const lng = this.lng;
    const lat = this.lat;
    const marker = L.marker([lat, lng]).bindPopup(this.titulo);
    marker.addTo(this.map);
  }

  // private initMap(): void {
  //   //configuración del mapa
  //   console.log(this.lat, this.lon);

  //   this.map = L.map('map', {
  //     center: [this.lat, this.lon],
  //     attributionControl: false,
  //     zoom: 14,
  //   });

  //   //iconos personalizados
  //   let iconDefault = L.icon({
  //     iconRetinaUrl,
  //     iconUrl,
  //     shadowUrl,
  //     iconSize: [25, 41],
  //     iconAnchor: [12, 41],
  //     popupAnchor: [1, -34],
  //     tooltipAnchor: [16, -28],
  //     shadowSize: [41, 41],
  //   });
  //   L.Marker.prototype.options.icon = iconDefault;

  // //titulo
  // const tiles = L.tileLayer(
  //   'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  //   {
  //     maxZoom: 19,
  //     attribution:
  //       '&copy; <a href="https://1938.com.es">Web Inteligencia Artificial</a>',
  //   }
  // );

  // //marca con pop up
  // const lon = this.lon + 0.009;
  // const lat = this.lat + 0.009;
  // const marker = L.marker([lat + 0.005, lon + 0.005]).bindPopup(this.titulo);
  // marker.addTo(this.map);

  // //marca forma de circulo
  // const mark = L.circleMarker([this.lat, this.lon]).addTo(this.map);
  // mark.addTo(this.map);

  // //ruta
  // L.Routing.control({
  //   router: L.Routing.osrmv1({
  //     serviceUrl: `https://router.project-osrm.org/route/v1/`,
  //   }),
  //   showAlternatives: true,
  //   fitSelectedRoutes: false,
  //   show: false,
  //   routeWhileDragging: true,
  //   waypoints: [L.latLng(this.lat, this.lon), L.latLng(lat, lon)],
  // }).addTo(this.map);
  // // tiles.addTo(this.map);
  // }
}
