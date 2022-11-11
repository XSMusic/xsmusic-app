import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Media } from '@models';
import { SiteService, ToastService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'sites-last-block',
  templateUrl: 'sites-last-block.component.html',
  animations: [inOutAnimation],
})
export class SitesLastBlockComponent implements OnInit {
  @Input() sites?: Media[] = [];
  @Input() type = 'club';
  title = '';
  slidesPerView = 6;
  loading = true;
  body = {
    page: 1,
    pageSize: 10,
    order: ['created', 'desc'],
    type: 'club',
  };
  constructor(
    private siteService: SiteService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setSlidesPerView();
    this.body.type = this.type;
    this.title = this.type === 'club' ? 'Ultimos Clubs' : 'Ultimos Festivales';
    this.getLastSites();
  }

  setSlidesPerView() {
    if (window.innerWidth <= 360) {
      this.slidesPerView = 3.5;
    } else if (window.innerWidth <= 500) {
      this.slidesPerView = 4.25;
    } else if (window.innerWidth <= 1440) {
      this.slidesPerView = 12.5;
    } else if (window.innerWidth > 1441) {
      this.slidesPerView = 15.5;
    }
  }

  getLastSites() {
    this.loading = true;
    this.siteService.getAll(this.body).subscribe({
      next: (response) => {
        this.sites = response.items;
        this.loading = false;
      },
      error: (error) => this.toast.showToast(TOAST_STATE.error, error),
    });
  }

  goToProfile(slug: string) {
    this.router.navigate([routesConfig.club.replace(':slug', slug)]);
  }
}
