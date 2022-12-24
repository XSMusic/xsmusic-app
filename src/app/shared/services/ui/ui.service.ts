import { Injectable } from '@angular/core';
import {
  FullImageService,
  MetaService,
  ModalService,
  NavigationService,
  ToastService,
} from '@services';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { NgxSpinnerService } from '../system/ngx-spinner/ngx-spinner.service';

@Injectable({ providedIn: 'root' })
export class UIService {
  constructor(
    public fullImage: FullImageService,
    public toast: ToastService,
    public modal: ModalService,
    public spinner: NgxSpinnerService,
    public meta: MetaService,
    public navigation: NavigationService,
    public ga: GoogleAnalyticsService
  ) {}
}
