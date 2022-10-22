import { Component, OnInit } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { getIcon } from '@core/config/icons.config';
import { GetAllDto } from '@interfaces';
import { Style } from '@models';
import { StyleService } from '@shared/services/api/style/style.service';

@Component({
  selector: 'page-admin-styles',
  templateUrl: 'admin-styles.page.html',
  animations: [inOutAnimation],
})
export class AdminStylesPage implements OnInit {
  styles: Style[] = [];
  body: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['name', 'asc'],
  };
  loading = true;
  error = false;
  getIcon = getIcon
  constructor(private styleService: StyleService) {}

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
    console.log(event);
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
}
