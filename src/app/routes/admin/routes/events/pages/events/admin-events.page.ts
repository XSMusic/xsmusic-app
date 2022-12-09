import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Event } from '@models';
import {
  EventService,
  NavigationService,
  ToastService,
  TOAST_STATE,
} from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { EventGetAllDto } from '@shared/services/api/event/event.dto';

@Component({
  selector: 'page-admin-events',
  templateUrl: 'admin-events.page.html',
  animations: [inOutAnimation],
})
export class AdminEventsPage {
  items: Event[] = [];
  itemsOld: Event[] = [];
  body: EventGetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['date', 'asc'],
  };
  bodyOld: EventGetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['date', 'desc'],
    old: true,
  };
  loading = true;
  error = false;
  total = 0;
  view = 'viewList';
  constructor(
    private eventService: EventService,
    private router: Router,
    private toast: ToastService,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.getEvents('new');
    this.getEvents('old');
  }

  getEvents(type: 'new' | 'old', more = false) {
    const body = type === 'new' ? this.body : this.bodyOld;
    const typeItem = type === 'new' ? 'items' : 'itemsOld';
    this.eventService.getAll(body).subscribe({
      next: (response) => {
        if (!more) {
          this[typeItem] = response.items;
          this.total = response.paginator.total;
        } else {
          this[typeItem] = this.items.concat(response.items);
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

  goToPage(data: GoToPageI) {
    data.admin = true;
    this.navigationService.goToPage(data);
  }

  filter(type: 'new' | 'old', event: { name: string; value: string }) {
    this.body.page = 1;
    this.body.filter = [event.name, event.value];
    this.getEvents(type);
  }

  removeFilter(type: 'new' | 'old') {
    this.body.page = 1;
    this.body.filter = [];
    this.getEvents(type);
  }

  reloadItems(type: 'new' | 'old') {
    this.body.page++;
    this.getEvents(type, true);
  }

  onClickButton(button: ButtonBlockItem) {
    if (button.action.includes('view')) {
      this.view = button.action;
    } else if (button.action === 'order') {
      this.toast.showToast(TOAST_STATE.info, 'En construccion');
    }
  }

  onSearch(type: 'new' | 'old', event: { text: string; type: string }) {
    if (event.text === '') {
      this.body.page = 1;
      this.getEvents(type);
    } else {
      this.body.page = 1;
      this.body.filter = ['name', event.text];
      this.getEvents(type);
    }
  }

  goToEvents() {
    this.router.navigate([routesConfig.events]);
  }
}
