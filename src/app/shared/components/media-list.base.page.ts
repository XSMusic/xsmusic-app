import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterListI, GetAllDto } from '@interfaces';
import { Media } from '@models';
import {
  MediaService,
  NavigationService,
  ToastService,
  TOAST_STATE,
} from '@services';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { getFilterList } from '@shared/utils';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { ButtonBlockItem } from './ui/buttons-block/buttons-block.model';

@Component({
  selector: 'media-list-base',
  template: `
    <header-custom
      [title]="title"
      [total]="total"
      (onClickTitle)="goToPage({ type: 'set', admin: true, typeRoute: 'all' })"
    ></header-custom>

    <div class="container px-4 pt-3 mx-auto max-w-full-xl sm:pb-0 max-w-7sm">
      <buttons-block
        type="media"
        (search)="onSearch($event)"
        (onFilter)="onFilter($event)"
        (onClickButton)="onClickButton($event)"
      ></buttons-block>

      <alert
        *ngIf="body.filter && body.filter.length > 0"
        type="info"
        message="Filtro activado."
        actionText="Quitar"
        (action)="removeFilter()"
      ></alert>

      <generic-view-gallery
        *ngIf="view === 'viewGallery'"
        [items]="items"
        [loading]="loading"
        [type]="body.type"
        (goToPage)="goToPage($event)"
        (onScroll)="onScroll()"
      ></generic-view-gallery>

      <media-view-list
        *ngIf="view === 'viewList'"
        [media]="items"
        [loading]="loading"
        [type]="body.type"
        (goToPage)="goToPage($event)"
        (filter)="onFilter($event)"
        (onScroll)="onScroll()"
      ></media-view-list>
    </div>
  `,
  styles: [],
})
export class MediaListBase implements OnInit {
  title!: string;
  items: Media[] = [];
  body: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['created', 'desc'],
    type: '',
  };
  @Input() type!: 'sets' | 'tracks';
  filterData!: FilterListI;
  loading = true;
  error = false;
  view = 'viewGallery';
  total = 0;

  constructor(
    public mediaService: MediaService,
    public route: ActivatedRoute,
    public toast: ToastService,
    public gaService: GoogleAnalyticsService,
    public navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.getFilter();
    this.setType();
    this.getItems();
  }

  getFilter() {
    this.filterData = getFilterList(this.route);
    if (this.filterData) {
      this.body.filter = this.filterData.data;
    }
  }

  setType() {
    if (this.type === 'sets') {
      this.title = 'Sets';
      this.body.type = 'set';
    } else {
      this.title = 'Tracks';
      this.body.type = 'track';
    }
  }

  getItems(more = false): void {
    this.mediaService.getAll(this.body).subscribe({
      next: (response) => {
        if (!more) {
          this.total = response.paginator.total;
          this.items = response.items;
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
      this.gaService.event(
        `${this.type}_change_${button.action}`,
        `${this.type}_filter`,
        `${this.type}`
      );
      this.view = button.action;
    } else {
      this.toast.showToast(TOAST_STATE.info, 'En construccion');
    }
  }

  onSearch(event: { text: string; type: string }) {
    if (event.text === '') {
      this.gaService.event(`sets_search_empty`, 'sets_search', 'sets');
      this.body.page = 1;
      this.getItems();
    } else {
      this.gaService.event(`sets_search_${event.text}}`, 'sets_search', 'sets');
      this.body.page = 1;
      this.body.filter = ['name', event.text];
      this.getItems();
    }
  }

  goToPage(data: GoToPageI) {
    this.navigationService.goToPage(data);
  }

  onFilter(event: { name: string; value: string }) {
    this.gaService.event(
      `sets_filter_${event.name.toLowerCase()}_${event.value.toLowerCase()}`,
      'sets_filter',
      'sets'
    );
    this.body.page = 1;
    this.body.filter = [event.name, event.value];
    this.getItems();
  }

  removeFilter() {
    this.gaService.event('sets_remove_filter', 'sets_filter', 'sets');
    this.body.page = 1;
    this.body.filter = [];
    this.getItems();
  }

  onScroll() {
    this.body.page++;
    this.getItems(true);
  }
}
