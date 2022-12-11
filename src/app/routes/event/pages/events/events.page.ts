import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { FilterListI, GetAllDto } from '@interfaces';
import { Event } from '@models';
import { EventService, NavigationService, ToastService } from '@services';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { getFilterList } from '@shared/utils';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'events',
  templateUrl: 'events.page.html',
  animations: [inOutAnimation],
})
export class EventsPage implements OnInit {
  items: Event[] = [];
  view = 'gallery';
  body: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['date', 'asc'],
  };
  filterData!: FilterListI;
  loading = true;
  error = false;
  total = 0;
  constructor(
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private eventService: EventService,
    private toast: ToastService,
    private gaService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.getFilter();
    this.getEvents();
  }

  getFilter() {
    this.filterData = getFilterList(this.route);
    if (this.filterData) {
      this.body.filter = this.filterData.data;
    }
  }

  getEvents(more = false) {
    this.eventService.getAll(this.body).subscribe({
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
      error: (error) => {
        this.loading = false;
        this.error = true;
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  goToPage(data: GoToPageI) {
    this.navigationService.goToPage(data);
  }

  filter(event: { name: string; value: string }) {
    this.gaService.event(
      `events_filter_${event.name.toLowerCase()}_${event.value.toLowerCase()}`,
      'events_filter',
      'events'
    );
    this.body.page = 1;
    this.body.filter = [event.name, event.value];
    this.getEvents();
  }

  removeFilter() {
    this.gaService.event('events_remove_filter', 'events_filter', 'events');
    this.body.page = 1;
    this.body.filter = [];
    this.getEvents();
  }

  onScroll() {
    this.body.page++;
    this.getEvents(true);
  }

  onClickTab(button: TabsItem) {
    if (button.action.includes('view')) {
      this.view = button.action;
    } else {
      this.toast.showToast(TOAST_STATE.info, 'En construccion');
    }
  }

  onSearch(event: { text: string; type: string }) {
    if (event.text === '') {
      this.gaService.event(`events_search_empty`, 'events_search', 'events');
      this.body.page = 1;
      this.getEvents();
    } else {
      this.gaService.event(
        `events_search_${event.text}}`,
        'events_search',
        'events'
      );
      this.body.page = 1;
      this.body.filter = ['name', event.text];
      this.getEvents();
    }
  }
}
