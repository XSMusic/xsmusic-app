import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterListI, GetAllDto } from '@interfaces';
import { Media } from '@models';
import { MediaService, NavigationService, ToastService } from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { getFilterList } from '@shared/utils';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'page-sets',
  templateUrl: 'sets.page.html',
})
export class SetsPage implements OnInit {
  items: Media[] = [];
  body: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['created', 'desc'],
    type: 'set',
  };
  filterData!: FilterListI;
  loading = true;
  error = false;
  view = 'viewGallery';
  total = 0;
  constructor(
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private gaService: GoogleAnalyticsService,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.getFilter();
    this.getItems();
  }

  getFilter() {
    this.filterData = getFilterList(this.route);
    if (this.filterData) {
      this.body.filter = this.filterData.data;
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
        `sets_change_${button.action}`,
        'sets_filter',
        'sets'
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
