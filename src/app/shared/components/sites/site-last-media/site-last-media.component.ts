import { Component, Input } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Site } from '@models';

@Component({
  selector: 'site-last-media',
  templateUrl: './site-last-media.component.html',
  animations: [inOutAnimation],
})
export class SiteLastMediaComponent {
  @Input() views: any[] = [];
  @Input() site!: Site;
  view = 'set';
}
