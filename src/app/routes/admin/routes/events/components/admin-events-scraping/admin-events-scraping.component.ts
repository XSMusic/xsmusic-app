import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { Event } from '@models';
import {
  EventService,
  ImageService,
  ModalService,
  ScrapingService,
  ToastService,
  TOAST_STATE,
} from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { ImageUploadByUrlDto } from '@shared/services/api/image/image.dto';
import {
  ScrapingEventI,
  ScrapingEventsI,
} from '@shared/services/api/scraping/scraping-source.interface';
import { ScrapingGetListEventsDto } from '@shared/services/api/scraping/scraping.dto';
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
    private eventService: EventService,
    private imageService: ImageService,
    private toast: ToastService,
    private router: Router,
    private modal: ModalService
  ) {}

  getEvents() {
    this.body.dateTo = DateFunctions.new()
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

  addEventConfirmation(item: any) {
    const modal = this.modal.showModalConfirm(
      `Añadir evento`,
      `¿Estas seguro de añadir el evento?`
    );
    const sub$ = modal.subscribe({
      next: (response) => {
        if (response !== '') {
          if (response === true) {
            this.addEvent(item);
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
    this.eventService.create(event).subscribe({
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
