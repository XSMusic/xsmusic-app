import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Event, Like, Media } from '@models';
import { GoToPageI } from '@shared/interfaces/goto.interface';
import { ApiTypes } from '@shared/utils';

@Component({
  selector: 'last-multi',
  templateUrl: './last-multi.component.html',
  animations: [inOutAnimation],
})
export class LastMultiComponent implements OnInit {
  @Input() views: any[] = [];
  @Input() item!: any;
  @Input() events: Event[] = [];
  @Input() sets: Media[] = [];
  @Input() tracks: Media[] = [];
  view = '';
  @Output() goToPage = new EventEmitter<GoToPageI>();
  @Output() likeOrDislike = new EventEmitter<{
    type: ApiTypes;
    like: Like;
    itemsType: 'artists' | 'sets' | 'tracks' | 'events';
  }>();

  ngOnInit() {
    this.view = this.views.length > 0 ? this.views[0].value : '';
  }
}
