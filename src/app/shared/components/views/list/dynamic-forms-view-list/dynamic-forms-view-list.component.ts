import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { DynamicForm } from '@models';
import { GoToPageI } from '@shared/interfaces/goto.interface';

@Component({
  selector: 'dynamic-forms-view-list',
  templateUrl: 'dynamic-forms-view-list.component.html',
  animations: [inOutAnimation],
})
export class DynamicFormsViewListComponent {
  @Input() items: DynamicForm[] = [];
  @Input() loading = true;
  @Output() goToPage = new EventEmitter<GoToPageI>();
  @Output() filter = new EventEmitter<{ name: string; value: string }>();
  @Output() onScroll = new EventEmitter<void>();

}
