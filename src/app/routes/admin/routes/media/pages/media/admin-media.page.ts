// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { routesConfig } from '@core/config';
// import { Media } from '@models';
// import { ApiService, TOAST_STATE, UIService } from '@services';

// @Component({
//   selector: 'page-admin-media',
//   templateUrl: 'admin-media.page.html',
// })
// export class AdminMediaPage implements OnInit {
//   id!: string;
//   media: Media = new Media();
//   title = '';
//   type = '';
//   constructor(
//     private route: ActivatedRoute,
//     private ui: UIService,
//     private router: Router,
//     private apiService: ApiService
//   ) {}

//   ngOnInit() {
//     this.type = this.route.snapshot.routeConfig!.path!.includes('sets')
//       ? 'sets'
//       : 'tracks';
//     this.title = this.type === 'sets' ? 'Editar Set' : 'Editar Track';
//     this.id = this.route.snapshot.paramMap.get('id')!;
//     this.getItem();
//   }

//   getItem() {
//     this.apiService
//       .getOne<Media>('media', { type: 'id', value: this.id })
//       .subscribe({
//         next: (response) => (this.media = response),
//         error: (error: any) =>
//           this.ui.toast.showToast(TOAST_STATE.error, error),
//       });
//   }

//   onSubmitSuccess() {
//     this.media = new Media();
//     const route =
//       this.type === 'sets'
//         ? [routesConfig.setsAdmin]
//         : [routesConfig.tracksAdmin];
//     this.router.navigate(route);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { GenericAdminOneBase } from '@components';

@Component({
  selector: 'page-admin-media',
  template: `<generic-admin-one-base type="media"></generic-admin-one-base>`,
})
export class AdminMediaPage extends GenericAdminOneBase implements OnInit {}
