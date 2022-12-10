import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService, NavigationService, ToastService } from '@services';
import { MediaListBase } from '@shared/components/media-list.base.page';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'page-tracks',
  template: `<media-list-base type="tracks"></media-list-base>`,
})
export class TracksPage extends MediaListBase {
  constructor(
    public override mediaService: MediaService,
    public override route: ActivatedRoute,
    public override toast: ToastService,
    public override gaService: GoogleAnalyticsService,
    public override navigationService: NavigationService
  ) {
    super(mediaService, route, toast, gaService, navigationService);
    console.log('adios');
  }
}
