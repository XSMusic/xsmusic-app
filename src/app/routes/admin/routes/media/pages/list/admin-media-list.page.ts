import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { GetAllDto } from '@interfaces';
import { Media, Youtube } from '@models';
import { NavigationService, ScrapingService } from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { MediaService } from '@shared/services/api/media/media.service';
import {
  ToastService,
  TOAST_STATE,
} from '@shared/services/ui/toast/toast.service';
import { NgxSpinnerService } from '@shared/services/system/ngx-spinner/ngx-spinner.service';
import { GoToPageI } from '@shared/interfaces/goto.interface';

@Component({
  selector: 'page-admin-media-list',
  templateUrl: 'admin-media-list.page.html',
  animations: [inOutAnimation],
})
export class AdminMediaListPage implements OnInit {
  title = '';
  items: Media[] = [];
  itemsSearch: Youtube[] = [];
  media: Media = new Media();
  body: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['updated', 'desc'],
    type: '',
  };
  type: 'sets' | 'tracks' = 'sets';
  loading = true;
  error = false;
  view = 'viewList';
  source = 'youtube';
  searchText = '';
  itemSelected?: Youtube;
  scraping: any = {
    images: [],
    infos: [],
    styles: [],
  };
  total = 0;
  constructor(
    private route: ActivatedRoute,
    private mediaService: MediaService,
    private router: Router,
    private toast: ToastService,
    private scrapingService: ScrapingService,
    private spinner: NgxSpinnerService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.routeConfig!.path! as 'sets' | 'tracks';
    if (this.type === 'sets') {
      this.title = 'Sets';
      this.body.type = 'set';
    } else {
      this.title = 'Tracks';
      this.body.type = 'track';
    }
    this.getItems();
  }

  getItems(more = false): void {
    this.mediaService.getAll(this.body).subscribe({
      next: (response) => {
        if (!more) {
          this.items = response.items;
          this.total = response.paginator.total;
        } else {
          this.items = this.items.concat(response.items);
        }
        this.loading = false;
        this.error = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  onClickButton(button: ButtonBlockItem) {
    if (button.action.includes('view')) {
      this.view = button.action;
    } else if (button.action === 'order') {
      this.toast.showToast(TOAST_STATE.info, 'En construccion');
    }
  }

  onSearch(event: { text: string; type: string }) {
    if (event.text === '') {
      this.body.page = 1;
      this.getItems();
    } else {
      this.body.page = 1;
      this.body.filter = ['name', event.text];
      this.getItems();
    }
  }

  goToPage(data: GoToPageI) {
    data.admin = true;
    this.navigationService.goToPage(data);
  }

  filter(event: { name: string; value: string }) {
    this.body.page = 1;
    this.body.filter = [event.name, event.value];
    this.getItems();
  }

  removeFilter() {
    this.body.page = 1;
    this.body.filter = [];
    this.getItems();
  }

  onScroll() {
    this.body.page++;
    this.getItems(true);
  }

  searchAdd(searchText: string) {
    if (this.source === 'youtube') {
      this.spinner.show();
      this.scrapingService
        .getListMedia({
          query: searchText,
          maxResults: '20',
          source: this.source,
        })
        .subscribe({
          next: (response) => this.onResponseSearchSuccess(response),
          error: (error) => this.onResponseSearchError(error),
        });
    } else {
      this.toast.showToast(TOAST_STATE.warning, 'En construccion');
    }
  }

  onResponseSearchSuccess(response: Youtube[]) {
    this.itemsSearch = response;
    this.spinner.hide();
  }

  onResponseSearchError(error: string) {
    this.spinner.hide();
    this.toast.showToast(TOAST_STATE.error, error);
  }

  selectItem(item: Youtube) {
    this.itemSelected = item;
    this.media = new Media({
      name: item.name,
      type: this.type === 'sets' ? 'set' : 'track',
      source: this.source,
      sourceId: item.videoId,
      info: item.info,
    });
    this.scraping.images = [item.image];
  }

  onSubmitSuccess(event: Media) {
    this.media = new Media();
    this.items.unshift(event);
  }

  goToMedia() {
    const route =
      this.type === 'sets' ? routesConfig.sets : routesConfig.tracks;
    this.router.navigate([route]);
  }
}
