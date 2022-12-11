import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-admin-sites',
  template: `<generic-admin-list-base
    *ngIf="!loading"
    type="site"
    [subType]="subType"
  ></generic-admin-list-base>`,
})
export class AdminSitesPage implements OnInit {
  subType!: 'club' | 'festival';
  loading = true;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const subType = this.route.snapshot.routeConfig!.path!.includes('clubs')
      ? 'clubs'
      : 'festivals';
    this.subType = subType === 'clubs' ? 'club' : 'festival';
    this.loading = false;
  }
}
