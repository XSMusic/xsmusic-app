import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService, NavigationService, ToastService } from '@services';
import { MediaListBase } from '@shared/components/media-list.base.page';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'page-sets',
  template: `<media-list-base type="sets"></media-list-base>`,
})
export class SetsPage extends MediaListBase implements OnInit {
  constructor(
    public override mediaService: MediaService,
    public override route: ActivatedRoute,
    public override toast: ToastService,
    public override gaService: GoogleAnalyticsService,
    public override navigationService: NavigationService
  ) {
    super(mediaService, route, toast, gaService, navigationService);
  }
}
