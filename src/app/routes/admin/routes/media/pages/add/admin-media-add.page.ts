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
  searchText = '';
  items: Youtube[] = [];
  itemSelected?: Youtube;
  media: Media = new Media();
  type = '';
  sourceSelected = '';
  constructor(
    private youtubeService: YoutubeService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getType();
  }

  getType() {
    this.type = this.route.snapshot.routeConfig!.path!.includes('sets')
      ? 'set'
      : 'track';
  }

  search() {
    this.spinner.show();
    this.youtubeService.search(this.searchText).subscribe({
      next: (response) => {
        this.items = response;
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  selectItem(item: Youtube) {
    this.itemSelected = item;
    this.media = new Media({
      name: item.name,
      image: item.image,
      type: this.type,
      source: this.sourceSelected,
      sourceId: item.videoId,
      info: item.info,
    });
  }

  onSubmitSuccess() {
    this.media = new Media();
  }
}