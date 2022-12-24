import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from '@models';
import {
  EventService,
  ImageService,
  ScrapingService,
  TOAST_STATE,
  UIService,
} from '@services';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { ImageUploadByUrlDto } from '@shared/services/api/image/image.dto';
import { ScrapingEventI } from '@shared/services/api/scraping/scraping-source.interface';

@Component({
  selector: 'admin-events-scraping-site',
  templateUrl: 'admin-events-scraping-site.component.html',
})
export class AdminEventsScrapingSiteComponent implements OnInit {
  @Input() id!: string;
  items!: ScrapingEventI[];
  @Output() onEventCreated = new EventEmitter<void>();
  constructor(
    private scrapingService: ScrapingService,
    private eventService: EventService,
    private imageService: ImageService,
    private ui: UIService
  ) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.scrapingService.getEventsBySiteId({ id: this.id }).subscribe({
      next: (response) => {
        this.items = response;
      },
      error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
    });
  }

  addEventConfirmation(data: GoToPageI) {
    const modal = this.ui.modal.showModalConfirm(
      `Añadir evento`,
      `¿Estas seguro de añadir el evento?`
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
    this.eventService.create(event).subscribe({
      next: (response) => {
        const data: ImageUploadByUrlDto = {
          id: response._id!,
          url: item.images![0],
          type: 'event',
        };
        this.imageService.uploadByUrl(data).subscribe({
          next: () => {
            this.items = this.items.filter((itemC) => itemC.name !== item.name);
            this.onEventCreated.emit();
            this.ui.toast.showToast(
              TOAST_STATE.success,
              'Evento añadido correctamente'
            );
          },
          error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
        });
      },
      error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
    });
  }

  discartEvent(value: ScrapingEventI) {
    this.scrapingService
      .createDiscart({
        value: `${value.site._id} ${value.date}`,
        source: 'event',
      })
      .subscribe();

    this.items = this.items.filter((item) => item !== value);
  }
}
