import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Site } from '@models';

@Component({
  selector: 'last-sites',
  templateUrl: 'last-sites.component.html',
  animations: [inOutAnimation],
})
export class LastSitesComponent implements OnInit {
  @Input() sites?: Site[] = [];
  @Input() type: 'club' | 'festival' = 'club';
  @Input() loading = true;
  @Input() error = false;
  title = '';
  @Output() goTo = new EventEmitter<{
    type: 'club' | 'festival';
    typeRoute: 'all' | 'one';
    slug?: string;
  }>();

  ngOnInit() {
    this.title = this.type === 'club' ? 'Ultimos Clubs' : 'Ultimos Festivales';
  }
}
