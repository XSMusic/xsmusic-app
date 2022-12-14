import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { Event } from '@models';
import {
  ApiService,
  ImageService,
  ScrapingService,
  TOAST_STATE,
  UIService,
} from '@services';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { ImageUploadByUrlDto } from '@shared/services/api/image/image.dto';
import {
  ScrapingEventI,
  ScrapingEventsI,
} from '@shared/services/api/scraping/scraping-source.interface';
import { ScrapingGetListEventsDto } from '@shared/services/api/scraping/scraping.dto';
import { firstLetterCase } from '@shared/utils';
import { DateFunctions } from '@shared/utils/dates';

@Component({
  selector: 'admin-events-scraping',
  templateUrl: 'admin-events-scraping.component.html',
})
export class AdminEventsScrapingComponent {
  sources = [{ name: 'RA', value: 'ra' }];
  dateNow = DateFunctions.new().format();
  daysSelected = 7;
  body: ScrapingGetListEventsDto = {
    source: '',
    maxResults: '10',
    area: '41',
    dateFrom: DateFunctions.new().format('YYYY-MM-DD'),
    dateTo: DateFunctions.new().add(7, 'days').format('YYYY-MM-DD'),
  };
  items!: ScrapingEventsI;
  view = 'viewCompleted';
  raAreas = [
    { name: 'Madrid', value: '41' },
    { name: 'Barcelona', value: '20' },
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
  @Output() onEventCreated = new EventEmitter<void>();
  constructor(
    private scrapingService: ScrapingService,
    private apiService: ApiService,
    private imageService: ImageService,
    private ui: UIService,
    private router: Router
  ) {}

  getEvents() {
    this.body.dateTo = DateFunctions.new()
      .add(this.daysSelected, 'days')
      .format('YYYY-MM-DD');
    this.scrapingService.getListEvents(this.body).subscribe({
      next: (response) => {
        this.items = response;
      },
      error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
    });
  }

  onClickTab(data: { tab: TabsItem }) {
    this.view = data.tab.action;
  }

  addEventConfirmation(data: GoToPageI) {
    const modal = this.ui.modal.showModalConfirm(
      `A??adir evento`,
      `??Estas seguro de a??adir el evento?`
    );
    const sub$ = modal.subscribe({
      next: (response) => {
        if (response !== '') {
          if (response === true) {
            this.addEvent(data.item);
          }
          sub$.unsubscribe();
        }
      },
    });
  }

  addEvent(item: any) {
    const event: Event = new Event({
      name: item.name,
      info: item.info,
      date: item.date,
      site: item.site._id,
    });
    this.apiService.create<Event>('events', event).subscribe({
      next: (response) => {
        const data: ImageUploadByUrlDto = {
          id: response._id!,
          url: item.images![0],
          type: 'event',
        };
        this.imageService.uploadByUrl(data).subscribe({
          next: () => {
            this.items.completed = this.items.completed.filter(
              (itemC) => itemC.name !== item.name
            );
            this.onEventCreated.emit();
            this.ui.toast.showToast(
              TOAST_STATE.success,
              'Evento a??adido correctamente'
            );
          },
          error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
        });
      },
      error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
    });
  }

  goToAddSite(data: GoToPageI) {
    const modal = this.ui.modal.showModalConfirm(
      `A??adir club`,
      `??Quieres ir a a??adir el club?`
    );
    const sub$ = modal.subscribe({
      next: (response) => {
        if (response !== '') {
          if (response === true) {
            this.router.navigate([routesConfig.clubsAdmin], {
              queryParams: {
                tab: 'viewAdd',
                fieldKey: 'name',
                fieldValue: firstLetterCase(data.item.site),
              },
            });
          }
          sub$.unsubscribe();
        }
      },
    });
  }

  discartEvent(value: ScrapingEventI) {
    this.scrapingService
      .createDiscart({
        value: `${value.site._id} ${value.date}`,
        source: 'event',
      })
      .subscribe();

    this.items.completed = this.items.completed.filter(
      (item) => item !== value
    );
  }
}
