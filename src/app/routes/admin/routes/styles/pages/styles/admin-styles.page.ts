import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { Style } from '@models';
import { TabsItem } from '@shared/components/ui/tabs/tabs.model';
import { StyleGetAllDto } from '@shared/services/api/style/style.dto';
import { StyleService } from '@shared/services/api/style/style.service';

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
  constructor(private router: Router, private styleService: StyleService) {}

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
    this.body.page = 1;
    this.body.filter = [event.name, event.value];
    this.getStyles();
  }

  removeFilter() {
    this.body.page = 1;
    this.body.filter = [];
    this.getStyles();
  }

  onScroll() {
    this.body.page++;
    this.getStyles(true);
  }

  onClickTab(button: TabsItem) {
    if (button.action === 'add') {
      this.router.navigate([routesConfig.styleAdminAdd]);
    }
  }

  onSearch(event: { text: string; type: string }) {
    if (event.text === '') {
      this.body.page = 1;
      this.getStyles();
    } else {
      this.body.page = 1;
      this.body.filter = ['name', event.text];
      this.getStyles();
    }
  }
}
