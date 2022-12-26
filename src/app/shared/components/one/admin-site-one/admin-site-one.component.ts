import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { ScrapingGetInfoClubResponse } from '@interfaces';
import { Image, Site, Style } from '@models';
import { ScrapingService, GeoService, UIService, TOAST_STATE } from '@services';
import { ScrapingGetInfoClubDto } from '@shared/services/api/scraping/scraping.dto';
import { countries } from 'assets/data/countries';
import { getKeyValueByParam } from '@shared/utils';

@Component({
  selector: 'admin-site-one',
  templateUrl: 'admin-site-one.component.html',
  animations: [inOutAnimation],
})
export class AdminSiteOneComponent implements OnInit {
  @Input() site = new Site();
  @Input() type!: 'club' | 'festival';
  styles: Style[] = [];
  countries = countries;
  scraping: any = {
    images: [],
    infos: [],
    styles: [],
  };
  types = [
    { name: 'Club', value: 'club' },
    { name: 'Festival', value: 'festival' },
  ];
  image = '';
  imageState = false;
  tempImages: string[] = [];
  @Output() onSubmit = new EventEmitter<{ scraping: any }>();
  @Output() showImage = new EventEmitter<{ image: Image; remote: boolean }>();
  @Output() uploadImageByUrl = new EventEmitter<string>();
  @Output() uploadImageByFile = new EventEmitter<File>();
  @Output() removeImage = new EventEmitter<Image>();
  @Output() setFirstImage = new EventEmitter<Image>();
  @Output() delete = new EventEmitter<Image>();
  constructor(
    private ui: UIService,
    private router: Router,
    private route: ActivatedRoute,
    private scrapingService: ScrapingService,
    private geoService: GeoService
  ) {}

  ngOnInit() {
    this.site.type = this.type;
    const dataByParams = getKeyValueByParam(this.route);
    if (dataByParams.key && dataByParams.value) {
      this.site[dataByParams.key] = dataByParams.value;
    }
  }

  onClickStyleItem(item: { name: string; _id: string }) {
    this.site.styles = this.site.styles?.filter(
      (style) => style.name !== item.name
    );
  }

  onChangeStyleSelect(e: any) {
    const newStyle = this.styles.find(
      (style) => style._id!.toString() === e.target.value.toString()
    );
    this.site.styles?.push(newStyle);
  }

  onKeyUpName() {
    this.ui.spinner.show();
    const body: ScrapingGetInfoClubDto = {
      name: this.site.name!,
      poblation: this.site.address.poblation,
    };
    this.scrapingService.getInfoClub(body).subscribe({
      next: (response) => this.setClubFromScraping(response),
      error: (error) => {
        this.ui.toast.showToast(TOAST_STATE.error, error);
        this.ui.spinner.hide();
      },
    });
  }

  async setClubFromScraping(
    response: ScrapingGetInfoClubResponse
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (response.address.street !== '') {
          this.site.address.street = response.address.street;
        }
        if (response.address.town !== '') {
          this.site.address.town = response.address.town;
        }
        if (response.address.state !== '') {
          this.site.address.state = response.address.state;
        }
        if (response.address.country !== '') {
          this.site.address.country = response.address.country;
        }
        if (response.address.coordinates.length > 0) {
          this.site.address.coordinates = response.address.coordinates;
        }
        this.scraping.images = response.images;
        this.ui.spinner.hide();
        resolve();
      } catch (error) {
        this.ui.spinner.hide();
        this.ui.toast.showToast(
          TOAST_STATE.error,
          'No ha sido posible scrapear sitio'
        );
        reject();
      }
    });
  }

  addressToCoordinates() {
    if (this.site.address.street !== '' && this.site.address.poblation !== '') {
      this.geoService
        .addressToCoordinates(
          `${this.site.address.street} ${this.site.address.poblation}`
        )
        .subscribe({
          next: (response) => {
            this.site.address.coordinates = response.coordinates;
            this.ui.toast.showToast(
              TOAST_STATE.success,
              'Coordenadas actualizadas'
            );
          },
          error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
        });
    } else {
      this.ui.toast.showToast(TOAST_STATE.error, 'Revisa la direccion');
    }
  }

  coordinatesToAddress() {
    if (this.site.address.coordinates.length === 2) {
      this.geoService
        .coordinatesToAddress(this.site.address.coordinates)
        .subscribe({
          next: (response) => {
            if (response.street) {
              this.site.address.country = response.street;
            }
            if (response.state) {
              this.site.address.country = response.state;
            }
            if (response.country) {
              this.site.address.country = response.country;
            }
            this.ui.toast.showToast(
              TOAST_STATE.success,
              'Direccion actualizada'
            );
          },
          error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
        });
    } else {
      this.ui.toast.showToast(TOAST_STATE.error, 'Revisa las coordenadas');
    }
  }

  goToSite(slug: string) {
    if (this.site.type === 'club') {
      this.router.navigate([routesConfig.club.replace(':slug', slug)]);
    } else {
      this.router.navigate([routesConfig.festival.replace(':slug', slug)]);
    }
  }
}
