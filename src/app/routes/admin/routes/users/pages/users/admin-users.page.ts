import { Component, OnInit } from '@angular/core';
import { User } from '@models';
import { ApiService, NavigationService } from '@services';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { GetAllDto } from '@shared/services/api/api.dtos';

@Component({
  selector: 'page-admin-users',
  templateUrl: 'admin-users.page.html',
})
export class AdminUsersPage implements OnInit {
  users: User[] = [];
  body = new GetAllDto();
  loading = true;
  error = false;
  constructor(
    private apiService: ApiService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(more = false) {
    this.apiService.getAll<User>('users', this.body).subscribe({
      next: (response) => {
        if (!more) {
          this.users = response.items;
        } else {
          this.users = this.users.concat(response.items);
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

  filter(event: { name: string; value: string }) {
    this.body.page = 1;
    this.body.filter = [event.name, event.value];
    this.getUsers();
  }

  removeFilter() {
    this.body.page = 1;
    this.body.filter = [];
    this.getUsers();
  }

  onScroll() {
    this.body.page!++;
    this.getUsers(true);
  }
}
