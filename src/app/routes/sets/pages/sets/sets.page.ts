import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaGetAllDto } from '@interfaces';
import { Media } from '@models';
import { MediaService, ToastService } from '@services';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'page-sets',
  templateUrl: 'sets.page.html',
})
export class SetsPage implements OnInit {
  items: Media[] = [];
  body: MediaGetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['updated', 'desc'],
    type: 'set',
  };
  loading = true;
  error = false;
  constructor(
    private route: ActivatedRoute,
    private mediaService: MediaService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
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
    }
  }

  onSearch(e: any) {
    return e;
  }

  goToProfile(media: Media) {
    this.router.navigate([`sets`, media._id]);
  }

  filter(event: { name: string; value: string }) {
    this.body.filter = [event.name, event.value];
    this.getItems();
  }

  removeFilter() {
    this.body.filter = [];
    this.getItems();
  }

  onScroll() {
    this.body.page++;
    this.getItems(true);
  }
}
