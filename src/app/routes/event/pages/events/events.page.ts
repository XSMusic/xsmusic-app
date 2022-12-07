import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { GetAllDto } from '@interfaces';
import { Event } from '@models';
import { EventService, ToastService } from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
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
  filterKey?: string;
  filterValue?: string;
  loading = true;
  error = false;
  total = 0;
  constructor(
    private router: Router,
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
    this.filterKey = this.route.snapshot.paramMap.get('filterKey')!;
    this.filterValue = this.route.snapshot.paramMap.get('filterValue')!;
    if (this.filterKey && this.filterValue) {
      this.body.filter = [this.filterKey, this.filterValue];
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

  goToProfile(data: { type: 'site' | 'event' | 'artist', event: Event }) {
    if (data.type === 'event') {
      this.gaService.event('events_link_profile', 'events_link', 'events');
      this.router.navigate([
        routesConfig.event.replace(':slug', data.event.slug!),
      ]);
    } else {
      if (data.event.site.type === 'club') {
        this.gaService.event('events_link_club', 'events_link', 'events');
        this.router.navigate([
          routesConfig.club.replace(':slug', data.event.slug!),
        ]);
      } else {
        this.gaService.event('events_link_festival', 'events_link', 'events');
        this.router.navigate([
          routesConfig.festival.replace(':slug', data.event.slug!),
        ]);
      }
    }
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

  onClickButton(button: ButtonBlockItem) {
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

  goToAdmin() {
    this.gaService.event('events_link_admin', 'events_link', 'events');
    this.router.navigate([routesConfig.eventsAdmin]);
  }
}
