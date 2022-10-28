import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { SearchDto } from '@interfaces';
import { Style } from '@models';
import { ButtonBlockItem } from '@shared/components/ui/buttons-block/buttons-block.model';
import { StyleGetAllDto } from '@shared/services/api/style/style.dto';
import { StyleService } from '@shared/services/api/style/style.service';
import {
  ToastService,
  TOAST_STATE,
} from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'page-admin-styles',
  templateUrl: 'admin-styles.page.html',
  animations: [inOutAnimation],
})
export class AdminStylesPage implements OnInit {
  styles: Style[] = [];
  body: StyleGetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['name', 'asc'],
    complete: true,
  };
  loading = true;
  error = false;
  constructor(
    private router: Router,
    private styleService: StyleService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getStyles();
  }

  getStyles(more = false) {
    this.styleService.getAll(this.body).subscribe({
      next: (response) => {
        if (!more) {
          this.styles = response.items;
        } else {
          this.styles = this.styles.concat(response.items);
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

  filter(event: { name: string; value: string }) {
    this.body.filter = [event.name, event.value];
    this.getStyles();
  }

  removeFilter() {
    this.body.filter = [];
    this.getStyles();
  }

  onScroll() {
    this.body.page++;
    this.getStyles(true);
  }

  onClickButton(button: ButtonBlockItem) {
    if (button.action === 'add') {
      this.router.navigate(['admin/styles/one']);
    }
  }

  onSearch(event: { text: string; type: string }) {
    if (event.text === '') {
      this.body.page = 1;
      this.getStyles();
    } else {
      const body: SearchDto = { value: event.text, limit: 20 };
      this.styleService.search(body).subscribe({
        next: (response) => {
          this.styles = response;
        },
        error: (error) => this.toast.showToast(TOAST_STATE.error, error),
      });
    }
  }
}
