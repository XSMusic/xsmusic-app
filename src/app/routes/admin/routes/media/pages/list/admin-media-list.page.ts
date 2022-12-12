import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-admin-media-list',
  template: `<generic-admin-list-base
    *ngIf="!loading"
    type="media"
    [subType]="subType"
  ></generic-admin-list-base>`,
})
export class AdminMediaListPage implements OnInit {
  subType!: 'set' | 'track';
  loading = true;
  // error = false;
  // view = 'viewList';
  // source = 'youtube';
  // searchText = '';
  // itemSelected?: Youtube;
  // scraping: any = {
  //   images: [],
  //   infos: [],
  //   styles: [],
  // };
  // total = 0;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const subType = this.route.snapshot.routeConfig!.path!.includes('sets')
      ? 'sets'
      : 'festivals';
    this.subType = subType === 'sets' ? 'set' : 'track';
    this.loading = false;
  }

  // getItems(more = false): void {
  //   this.mediaService.getAll(this.body).subscribe({
  //     next: (response) => {
  //       if (!more) {
  //         this.items = response.items;
  //         this.total = response.paginator.total;
  //       } else {
  //         this.items = this.items.concat(response.items);
  //       }
  //       this.loading = false;
  //       this.error = false;
  //     },
  //     error: () => {
  //       this.loading = false;
  //       this.error = true;
  //     },
  //   });
  // }

  // onClickTab(button: TabsItem) {
  //   if (button.action.includes('view')) {
  //     this.view = button.action;
  //   } else if (button.action === 'order') {
  //     this.toast.showToast(TOAST_STATE.info, 'En construccion');
  //   }
  // }

  // onSearch(event: { text: string; type: string }) {
  //   if (event.text === '') {
  //     this.body.page = 1;
  //     this.getItems();
  //   } else {
  //     this.body.page = 1;
  //     this.body.filter = ['name', event.text];
  //     this.getItems();
  //   }
  // }

  // goToPage(data: GoToPageI) {
  //   if (data.admin === undefined) {
  //     data.admin = true;
  //   }
  //   this.navigationService.goToPage(data);
  // }

  // filter(event: { name: string; value: string }) {
  //   this.body.page = 1;
  //   this.body.filter = [event.name, event.value];
  //   this.getItems();
  // }

  // removeFilter() {
  //   this.body.page = 1;
  //   this.body.filter = [];
  //   this.getItems();
  // }

  // onScroll() {
  //   this.body.page++;
  //   this.getItems(true);
  // }

  // searchAdd(searchText: string) {
  //   if (this.source === 'youtube') {
  //     this.spinner.show();
  //     this.scrapingService
  //       .getListMedia({
  //         query: searchText,
  //         maxResults: '20',
  //         source: this.source,
  //       })
  //       .subscribe({
  //         next: (response) => this.onResponseSearchSuccess(response),
  //         error: (error) => this.onResponseSearchError(error),
  //       });
  //   } else {
  //     this.toast.showToast(TOAST_STATE.warning, 'En construccion');
  //   }
  // }

  // onResponseSearchSuccess(response: Youtube[]) {
  //   this.itemsSearch = response;
  //   this.spinner.hide();
  // }

  // onResponseSearchError(error: string) {
  //   this.spinner.hide();
  //   this.toast.showToast(TOAST_STATE.error, error);
  // }

  // selectItem(item: Youtube) {
  //   this.itemSelected = item;
  //   this.media = new Media({
  //     name: item.name,
  //     type: this.body.type === 'set' ? 'set' : 'track',
  //     source: this.source,
  //     sourceId: item.videoId,
  //     info: item.info,
  //   });
  //   this.scraping.images = [item.image];
  // }

  // onSubmitSuccess(event: Media) {
  //   this.media = new Media();
  //   this.items.unshift(event);
  // }
}
