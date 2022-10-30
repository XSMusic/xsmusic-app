import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Media } from '@models';
import { ToastService } from '@services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'page-admin-media-edit',
  templateUrl: 'admin-media-edit.page.html',
})
export class AdminMediaEditPage implements OnInit {
  id!: string;
  media: Media = new Media();
  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  onSubmitSuccess() {
    this.media = new Media();
  }
}
