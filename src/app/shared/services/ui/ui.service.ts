import { Injectable } from '@angular/core';
import { MetaService, NavigationService } from '@services';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { NgxSpinnerService } from '../system/ngx-spinner/ngx-spinner.service';
import { FullImageService } from './full-image/full-image.service';
import { ModalService } from './modal/modal.service';
import { ToastService } from './toast/toast.service';

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
