import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Site } from '@models';
import { MetaService, SiteService, ToastService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { NgxSpinnerService } from '@shared/services/system/ngx-spinner/ngx-spinner.service';
import { MetadataI } from '@shared/services/system/meta';
import { environment } from '@env/environment';

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
    private metaService: MetaService
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
        this.setMeta();
        this.setViews();
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  setMeta() {
    const meta: MetadataI = {
      title: this.site.name!,
      image: `${environment.IMAGES_URL}/${this.site.images![0].url}`,
      url: `${environment.APP_URL}${routesConfig.club.replace(
        ':slug',
        this.site.slug!
      )}`,
    };
    if (this.site.info !== '') {
      meta.description = this.site.info;
    }
    this.metaService.setMetaDynamic(meta);
  }

  // setTitle() {
  //   this.title.setTitle(`${this.title.getTitle()} - ${this.site.name}`);
  // }

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
