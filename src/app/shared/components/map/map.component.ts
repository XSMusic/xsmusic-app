import { AfterViewInit, Component, Input } from '@angular/core';
import { Site } from '@models';
import * as L from 'leaflet';

@Component({
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  @Input() center: L.LatLngExpression = [40.3053858, -3.8712108];
  @Input() class = '';
  @Input() zoom = 13;
  @Input() markers: Site[] = [];
  @Input() dragabble = false;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.center,
      attributionControl: true,
      zoom: this.zoom,
    });

    console.log(this.map);
    this.addTiles();
    this.addMakers();
  }

  addTiles() {
    const tiles = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );
    const googleHybrid = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );
    tiles.addTo(this.map);
  }

  addMakers() {
    for (const site of this.markers) {
      if (site.address && site.address.coordinates.length > 0) {
        const img = `<img class="w-10 h-10 rounded-full hover:scale-105 hover:duration-1000" src='${site.image}' />`;

        const icon = L.divIcon({
          html: img!,
          className: 'image-icon',
          iconSize: [52, 52],
        });
        const marker = L.marker(site.address.coordinates, {
          icon,
          draggable: this.dragabble,
        }).bindPopup(site.name!);
        marker.addTo(this.map);
      }
    }
  }
}
