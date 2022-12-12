import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Event, Media } from '@models';
import { GoToPageI } from '@shared/interfaces/goto.interface';

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

  ngOnInit() {
    this.view = this.views.length > 0 ? this.views[0].value : '';
  }
}
