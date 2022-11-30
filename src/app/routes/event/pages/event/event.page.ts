import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Event } from '@models';
import { ToastService } from '@services';
import { EventService } from '@shared/services/api/event/event.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'page-event',
  templateUrl: 'event.page.html',
  animations: [inOutAnimation],
})
export class EventPage implements OnInit {
  event!: Event;
  events: Event[] = [];
  slug!: string;
  views: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private toast: ToastService,
    private spinner: NgxSpinnerService,
    private title: Title
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.getEvent();
  }

  getEvent() {
    this.eventService.getOne('slug', this.slug).subscribe({
      next: (response) => {
        this.event = response;
        this.setTitle();
        this.setViews();
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  setTitle() {
    this.title.setTitle(`${this.title.getTitle()} - ${this.event.name}`);
  }

  setViews() {
    this.views = [
      { name: 'Artistas', value: 'artist', counter: this.event.artists!.length },
    ];
  }
}
