import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-admin-medias',
  template: `<generic-admin-list-base
    *ngIf="!loading"
    type="media"
    [subType]="subType"
  ></generic-admin-list-base>`,
})
export class AdminMediasPage implements OnInit {
  subType!: 'set' | 'track';
  loading = true;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const subType = this.route.snapshot.routeConfig!.path!.includes('sets')
      ? 'sets'
      : 'festivals';
    this.subType = subType === 'sets' ? 'set' : 'track';
    this.loading = false;
  }
}
