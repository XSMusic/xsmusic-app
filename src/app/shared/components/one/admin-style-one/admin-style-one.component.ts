import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Image, Style } from '@models';

@Component({
  selector: 'admin-style-one',
  templateUrl: './admin-style-one.component.html',
})
export class AdminStyleOneComponent {
  @Input() style!: Style;
  @Output() onSubmit = new EventEmitter<{ scraping: any }>();
  @Output() delete = new EventEmitter<Image>();
}
