import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { GetAllDto } from '@interfaces';
import { Event } from '@models';
import { EventService, ToastService, TOAST_STATE } from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';

@Component({
  selector: 'page-admin-events',
  templateUrl: 'admin-events.page.html',
  animations: [inOutAnimation],
})
export class AdminEventsPage {
  items: Event[] = [];
  body: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['updated', 'desc'],
  };
  loading = true;
  error = false;
  total = 0;
  view = 'viewList';
  constructor(
    private eventService: EventService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getEvents();
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
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  goToProfile(item: Event) {
    this.router.navigate([routesConfig.eventAdmin.replace(':id', item._id!)]);
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
    } else if (button.action === 'order') {
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
