import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Media } from '@models';

@Component({
  selector: 'last-media',
  templateUrl: './last-media.component.html',
  animations: [inOutAnimation],
})
export class LastMediaComponent {
  @Input() sets!: Media[];
  @Input() tracks!: Media[];
  @Input() loadingSets = true;
  @Input() loadingTracks = true;
  @Input() errorSets = false;
  @Input() errorTracks = false;
  view = 'sets';
  @Output() goTo = new EventEmitter<{
    type: 'set' | 'track';
    typeRoute: 'all' | 'one';
    slug?: string;
  }>();
}
