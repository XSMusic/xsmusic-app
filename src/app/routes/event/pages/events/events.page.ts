import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { GetAllDto } from '@interfaces';
import { Event } from '@models';
import { EventService, ToastService } from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

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
    private toast: ToastService
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

  onClickItemViewGallery(item: Event) {
    this.router.navigate([routesConfig.event.replace(':slug', item.slug!)]);
  }

  goToProfile(data: { type: 'site' | 'event'; event: Event }) {
    if (data.type === 'event') {
      this.router.navigate([
        routesConfig.event.replace(':slug', data.event.slug!),
      ]);
    } else {
      if (data.event.site.type === 'club') {
        this.router.navigate([
          routesConfig.club.replace(':slug', data.event.slug!),
        ]);
      } else {
        this.router.navigate([
          routesConfig.festival.replace(':slug', data.event.slug!),
        ]);
      }
    }
  }

  filter(event: { name: string; value: string }) {
    this.body.page = 1;
    this.body.filter = [event.name, event.value];
    this.getEvents();
  }

  removeFilter() {
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
      this.body.page = 1;
      this.getEvents();
    } else {
      this.body.page = 1;
      this.body.filter = ['name', event.text];
      this.getEvents();
    }
  }
}
