import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Site } from '@models';
import { SiteService, ToastService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { NgxSpinnerService } from '@shared/services/system/ngx-spinner/ngx-spinner.service';

@Component({
  selector: 'page-club',
  templateUrl: 'club.page.html',
  animations: [inOutAnimation],
})
export class ClubPage implements OnInit {
  site!: Site;
  slug!: string;
  views: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private siteService: SiteService,
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private title: Title
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.getItem();
  }

  getItem() {
    this.siteService.getOne('slug', this.slug).subscribe({
      next: (response: any) => {
        this.site = response;
        this.setTitle();
        this.setViews();
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  setTitle() {
    this.title.setTitle(`${this.title.getTitle()} - ${this.site.name}`);
  }

  setViews() {
    if (this.site.events && this.site.events.length > 0) {
      this.views.push({
        name: 'Eventos',
        value: 'eventSite',
        counter: this.site.events ? this.site.events.length : 0,
      });
    }
    if (this.site.sets && this.site.sets.length > 0) {
      this.views.push({
        name: 'Sets',
        value: 'set',
        counter: this.site.sets.length,
      });
    }
    if (this.site.images && this.site.images.length > 1) {
      this.views.push({
        name: 'Imagenes',
        value: 'image',
        counter:
          this.site.images!.length === 0
            ? this.site.images!.length
            : this.site.images!.length - 1,
      });
    }
  }

  goTo(club: Site) {
    this.router.navigate([routesConfig.club.replace(':id', club._id!)]);
  }
}
