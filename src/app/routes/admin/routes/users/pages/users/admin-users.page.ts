import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routesConfig } from '@core/config';
import { User } from '@models';
import { UserService } from '@services';
import { UserGetAllDto } from '@shared/services/api/user/dtos/user.dto';

@Component({
  selector: 'page-admin-users',
  templateUrl: 'admin-users.page.html',
})
export class AdminUsersPage implements OnInit {
  users: User[] = [];
  body: UserGetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['updated', 'desc'],
  };
  loading = true;
  error = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(more = false) {
    this.userService.getAll(this.body).subscribe({
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
  goToProfile(item: User) {
    this.router.navigate([routesConfig.userAdmin.replace(':id', item._id!)]);
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
    this.body.page++;
    this.getUsers(true);
  }
}
