import { Injectable } from '@angular/core';
import { MetaService, NavigationService } from '@services';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { NgxSpinnerService } from '../system/ngx-spinner/ngx-spinner.service';
import { FullImageService } from './full-image/full-image.service';
import { GAService } from './google-analytics/ga.service';
import { ModalService } from './modal/modal.service';
import { ToastService } from './toast/toast.service';

@Injectable({ providedIn: 'root' })
export class UIService {
  constructor(
    public fullImage: FullImageService,
    public ga: GoogleAnalyticsService,
    public ga2: GAService,
    public meta: MetaService,
    public modal: ModalService,
    public navigation: NavigationService,
    public spinner: NgxSpinnerService,
    public toast: ToastService
  ) {}
}
