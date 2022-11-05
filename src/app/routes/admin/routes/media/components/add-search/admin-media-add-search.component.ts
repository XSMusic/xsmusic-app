import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'admin-media-add-search',
  templateUrl: './admin-media-add-search.component.html',
})
export class AdminMediaAddSearchComponent {
  searchText!: string;
  @Output() search = new EventEmitter<string>();
}
