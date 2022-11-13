import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Media, Site } from '@models';
import { SiteService, ToastService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'page-festival',
  templateUrl: 'festival.page.html',
  animations: [inOutAnimation],
})
export class FestivalPage implements OnInit {
  site!: Site;
  slug!: string;
  views: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private siteService: SiteService,
    private toast: ToastService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.getArtist();
  }

  getArtist() {
    this.siteService.getOne('slug', this.slug).subscribe({
      next: (response: any) => {
        this.site = response;
        this.views = [
          { name: 'Sets', value: 'set', counter: response.sets.length },
          {
            name: 'Eventos',
            value: 'event',
            counter: response.events ? response.events.length : 0,
          },
        ];
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  goToSet(set: Media) {
    this.router.navigate([routesConfig.set.replace(':id', set._id!)]);
  }
}
