import { Injectable } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { GA } from './ga.model';

@Injectable({ providedIn: 'root' })
export class GAService {
  constructor(private googleAnalyticsService: GoogleAnalyticsService) {}

  event(data: GA): void {
    let typeOk: string;
    let eventOk: string;
    if (data.one !== undefined) {
      if (data.one === false) {
        typeOk = `${data.type}s`;
        eventOk = `${typeOk}_${data.event}`;
      } else if (data.one === true) {
        typeOk = data.type!;
        eventOk = `${typeOk}_${data.event}`;
      }
    } else {
      typeOk = 'app';
      eventOk = `${typeOk}_${data.event}`;
    }
    this.googleAnalyticsService.event(eventOk!, typeOk!);
  }
}
