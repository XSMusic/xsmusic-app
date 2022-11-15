import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Media, Youtube } from '@models';
import { ToastService } from '@services';
import { YoutubeService } from '@shared/services/api/youtube/youtube.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'page-admin-media-add',
  templateUrl: 'admin-media-add.page.html',
  animations: [inOutAnimation],
})
export class AdminMediaAddPage implements OnInit {
  title = '';
  searchText = '';
  items: Youtube[] = [];
  itemSelected?: Youtube;
  media: Media = new Media();
  type = '';
  source = 'youtube';
  scraping: any = {
    images: [],
    infos: [],
    styles: [],
  };
  constructor(
    private youtubeService: YoutubeService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getType();
    this.getSourceAndValueWithParams();
    this.title = `Nuevo ${this.type}`;
  }

  getType() {
    this.type = this.route.snapshot.routeConfig!.path!.includes('sets')
      ? 'set'
      : 'track';
  }
  getSourceAndValueWithParams() {
    const source = this.route.snapshot.paramMap.get('source');
    const value = this.route.snapshot.paramMap.get('value');
    if (source && value) {
      this.source = source === 'default' ? 'youtube' : source;
      this.searchText = value;
    }
    console.log(this.source, this.searchText);
  }

  search(searchText: string) {
    this.spinner.show();
    this.searchByText(searchText);
  }

  searchByText(searchText: string) {
    this.youtubeService.searchByText(searchText).subscribe({
      next: (response) => this.onResponseSearchSuccess(response),
      error: (error) => this.onResponseSearchError(error),
    });
  }

  onResponseSearchSuccess(response: Youtube[]) {
    this.items = response;
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
      type: this.type,
      source: this.source,
      sourceId: item.videoId,
      info: item.info,
    });
    this.scraping.images = [item.image];
  }

  onSubmitSuccess() {
    this.media = new Media();
  }
}
