import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { Event } from '@models';
import {
  EventService,
  ImageService,
  ScrapingService,
  ToastService,
  TOAST_STATE,
} from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { ImageUploadByUrlDto } from '@shared/services/api/image/image.dto';
import { ScrapingEventsI } from '@shared/services/api/scraping/scraping-source.interface';
import { ScrapingGetListEventsDto } from '@shared/services/api/scraping/scraping.dto';
import * as moment from 'moment';

@Component({
  selector: 'admin-events-scraping',
  templateUrl: 'admin-events-scraping.component.html',
})
export class AdminEventsScrapingComponent {
  sources = [{ name: 'RA', value: 'ra' }];
  dateNow = moment().format();
  daysSelected = 7;
  body: ScrapingGetListEventsDto = {
    source: '',
    maxResults: '10',
    area: '41',
    dateFrom: moment().format('YYYY-MM-DD'),
    dateTo: moment().add(7, 'days').format('YYYY-MM-DD'),
  };
  items!: ScrapingEventsI;
  view = 'viewCompleted';
  raAreas = [
    { name: 'Madrid', value: '41' },
    { name: 'Este', value: '160' },
    { name: 'Norte', value: '170' },
    { name: 'Sur', value: '169' },
    { name: 'Ibiza', value: '25' },
  ];
  days = [
    { name: 'Proximos 7 dias', value: 7 },
    { name: 'Proximas 14 dias', value: 14 },
    { name: 'Proximas 30 dias', value: 30 },
  ];
  maxResults = ['10', '25', '50'];
  constructor(
    private scrapingService: ScrapingService,
    private eventService: EventService,
    private imageService: ImageService,
    private toast: ToastService,
    private router: Router
  ) {}

  getEvents() {
    this.body.dateTo = moment()
      .add(this.daysSelected, 'days')
      .format('YYYY-MM-DD');
    this.scrapingService.getListEvents(this.body).subscribe({
      next: (response) => {
        this.items = response;
      },
      error: (error) => this.toast.showToast(TOAST_STATE.error, error),
    });
  }

  onClickButton(button: ButtonBlockItem) {
    this.view = button.action;
  }

  addEvent(item: any) {
    const event: Event = new Event({
      name: item.name,
      info: item.info,
      date: item.date,
      site: item.site._id,
    });
    this.eventService.create(event).subscribe({
      next: (response) => {
        const data: ImageUploadByUrlDto = {
          id: response._id!,
          url: item.images![0],
          type: 'event',
        };
        this.imageService.uploadByUrl(data).subscribe({
          next: () => {
            this.toast.showToast(
              TOAST_STATE.success,
              'Evento añadido correctamente'
            );
          },
          error: (error) => this.toast.showToast(TOAST_STATE.error, error),
        });
      },
      error: (error) => this.toast.showToast(TOAST_STATE.error, error),
    });
  }

  goToAddSite() {
    this.router.navigate([routesConfig.clubAdminAdd]);
  }
}
