import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { MediaGetAllDto } from '@interfaces';
import { Media } from '@models';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { MediaService } from '@shared/services/api/media/media.service';
import {
  ToastService,
  TOAST_STATE,
} from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'page-admin-media-list',
  templateUrl: 'admin-media-list.page.html',
  animations: [inOutAnimation],
})
export class AdminMediaListPage implements OnInit {
  title = '';
  items: Media[] = [];
  body: MediaGetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['updated', 'desc'],
    type: '',
  };
  type = '';
  loading = true;
  error = false;
  constructor(
    private route: ActivatedRoute,
    private mediaService: MediaService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.routeConfig!.path!;
    if (this.type === 'sets') {
      this.title = 'Sets';
      this.body.type = 'set';
    } else {
      this.title = 'Tracks';
      this.body.type = 'track';
    }
    this.getItems();
  }

  getItems(more = false): void {
    this.mediaService.getAll(this.body).subscribe({
      next: (response) => {
        if (!more) {
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
    if (button.action === 'order' || button.action === 'filter') {
      this.toast.showToast(TOAST_STATE.info, 'En construccion');
    } else if (button.action === 'add') {
      this.router.navigate([`/admin/media/${this.type}/add`]);
    }
  }

  onSearch(e: any) {
    return e;
  }

  goToProfile(media: Media) {
    this.router.navigate([`admin/media/${this.type}/edit/`, media._id]);
  }

  filter(event: { name: string; value: string }) {
    this.body.filter = [event.name, event.value];
    this.getItems();
  }

  onScroll() {
    this.body.page++;
    this.getItems(true);
  }
}
