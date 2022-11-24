import { Component, OnInit } from '@angular/core';
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
export class AdminEventsScrapingComponent implements OnInit {
  sources = [{ name: 'RA', value: 'ra' }];
  dateNow = moment().format();
  body: ScrapingGetListEventsDto = {
    source: 'ra',
    maxResults: '10',
    dateFrom: moment().format('YYYY-MM-DD'),
    dateTo: moment().add(7, 'days').format('YYYY-MM-DD'),
  };
  items!: ScrapingEventsI;
  view = 'viewCompleted';

  constructor(
    private scrapingService: ScrapingService,
    private eventService: EventService,
    private imageService: ImageService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.sources.length === 1) {
      this.body.source = this.sources[0].value;
    }
    this.getEvents();
  }

  getEvents() {
    this.scrapingService.getListEvents(this.body).subscribe({
      next: (response) => {
        console.log(response);
        this.items = response;
      },
      error: (error) => this.toast.showToast(TOAST_STATE.error, error),
    });
  }

  onClickButton(button: ButtonBlockItem) {
    this.view = button.action;
  }

  addEvent(item: any) {
    console.log(item);
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
          next: (response) => {
            console.log(response);
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
    console.log(event);
  }

  goToAddSite() {
    this.router.navigate([routesConfig.clubAdminAdd]);
  }
}
