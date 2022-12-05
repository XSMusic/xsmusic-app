import { AfterViewInit, Component, Input } from '@angular/core';
import { Site } from '@models';
import { environment } from '@env/environment';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Router } from '@angular/router';
import { LeafletService } from '@shared/services/system/leaflet/leaflet.service';
import { imageArray } from '@shared/utils';

@Component({
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['./map.component.css'],
  animations: [inOutAnimation],
})
export class MapComponent implements AfterViewInit {
  private map!: any;
  @Input() center = [40.417244274063485, -3.7021285218467663];
  @Input() class = '';
  @Input() style = '';
  @Input() zoom = 13;
  @Input() markers: Site[] = [];
  @Input() dragabble = false;
  @Input() one = false;
  popup: any;
  site = new Site();

  constructor(
    private router: Router,

    private leafletService: LeafletService
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.leafletService.getCurrentPosition(this.map);
    this.setEvents();
  }

  private initMap(): void {
    const center =
      this.markers.length === 1
        ? this.markers[0].address.coordinates
        : this.center;
    const darkMode = this.leafletService.isDarkMode();
    const layers = !darkMode
      ? [this.leafletService.getMapGoogleNormal()]
      : [this.leafletService.getDarkMode()];
    this.map = this.leafletService.L.map('map', {
      center,
      attributionControl: true,
      zoom: this.zoom,
      layers,
    });

    const baseMaps = {
      Normal: this.leafletService.getMapGoogleNormal(),
      Hibrido: this.leafletService.getMapGoogleHybrid(),
      Oscuro: this.leafletService.getDarkMode(),
    };
    this.leafletService.L.control.layers(baseMaps).addTo(this.map);

    this.addMakers();
  }

  addMakers() {
    const markers = this.leafletService.L.markerClusterGroup({
      removeOutsideVisibleBounds: false,
      showCoverageOnHover: false,
      animate: true,
    });
    for (const site of this.markers) {
      if (site.address && site.address.coordinates.length > 0) {
        const imageUrl = imageArray(site.images!, 'small');
        const img = `<img style="width:3rem; height:3rem" class="object-cover rounded-full border hover:scale-105 hover:duration-1000" src='${imageUrl}' />`;

        const icon = this.leafletService.L.divIcon({
          html: img,
          className: 'image-icon',
          iconSize: [48, 48],
        });

        const marker = this.leafletService.L.marker(site.address.coordinates, {
          icon,
          title: site._id,
          draggable: this.dragabble,
        }).on('click', (e: any) => {
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
