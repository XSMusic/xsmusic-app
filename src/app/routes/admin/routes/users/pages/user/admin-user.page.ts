// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { User } from '@models';
// import { ApiService, TOAST_STATE, UIService } from '@services';
// import { NgxSpinnerService } from '@shared/services/system/ngx-spinner/ngx-spinner.service';

// @Component({
//   selector: 'page-admin-user',
//   templateUrl: 'admin-user.page.html',
// })
// export class AdminUserPage implements OnInit {
//   id!: string;
//   user: User = new User();
//   title!: string;
//   view = 'viewInfo';

//   constructor(
//     private apiService: ApiService,
//     private ui: UIService,
//     private route: ActivatedRoute,
//     private spinner: NgxSpinnerService
//   ) {}

//   ngOnInit() {
//     this.id = this.route.snapshot.paramMap.get('id')!;
//     if (this.id) {
//       this.title = 'Editar Artista';
//       this.getOne();
//     } else {
//       this.title = 'Nuevo Artista';
//     }
//   }

//   getOne() {
//     this.spinner.show();
//     this.apiService
//       .getOne<User>('users', { type: 'id', value: this.id })
//       .subscribe({
//         next: (response) => {
//           this.user = response;
//           this.spinner.hide();
//         },
//         error: (error) => {
//           this.ui.toast.showToast(TOAST_STATE.error, error);
//           this.spinner.hide();
//         },
//       });
//   }
// }

import { Component } from '@angular/core';
import { GenericAdminOneBase } from '@components';

@Component({
  selector: 'page-admin-user',
  template: `<generic-admin-one-base type="user"></generic-admin-one-base>`,
})
export class AdminUserPage extends GenericAdminOneBase {}
