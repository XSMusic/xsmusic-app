import { Component } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';

@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  animations: [inOutAnimation],
})
export class FilterBarComponent {}
