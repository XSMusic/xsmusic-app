import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { GetAllDto } from '@interfaces';
import { Media } from '@models';
import { MediaService, NavigationService, ToastService } from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'page-tracks',
  templateUrl: 'tracks.page.html',
})
export class TracksPage implements OnInit {
  items: Media[] = [];
  body: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['created', 'desc'],
    type: 'track',
  };
  loading = true;
  error = false;
  view = 'viewGallery';
  total = 0;
  constructor(
    private mediaService: MediaService,
    private router: Router,
    private toast: ToastService,
    private gaService: GoogleAnalyticsService,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.getItems();
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
        `tracks_change_${button.action}`,
        'tracks_filter',
        'tracks'
      );
      this.view = button.action;
    } else {
      this.toast.showToast(TOAST_STATE.info, 'En construccion');
    }
  }

  onSearch(event: { text: string; type: string }) {
    if (event.text === '') {
      this.gaService.event(`tracks_search_empty`, 'tracks_search', 'tracks');
      this.body.page = 1;
      this.getItems();
    } else {
      this.gaService.event(
        `tracks_search_${event.text}}`,
        'tracks_search',
        'tracks'
      );
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
      `tracks_filter_${event.name.toLowerCase()}_${event.value.toLowerCase()}`,
      'tracks_filter',
      'tracks'
    );
    this.body.page = 1;
    this.body.filter = [event.name, event.value];
    this.getItems();
  }

  removeFilter() {
    this.gaService.event('tracks_remove_filter', 'tracks_filter', 'tracks');
    this.body.page = 1;
    this.body.filter = [];
    this.getItems();
  }

  onScroll() {
    this.body.page++;
    this.getItems(true);
  }

  goToAdmin() {
    this.gaService.event('tracks_link_admin', 'tracks_link', 'tracks');
    this.router.navigate([routesConfig.tracksAdmin]);
  }
}
