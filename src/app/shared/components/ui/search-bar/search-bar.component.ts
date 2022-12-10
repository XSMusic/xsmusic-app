import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';

@Component({
  selector: 'search-bar',
  templateUrl: 'search-bar.component.html',
  animations: [inOutAnimation],
})
export class SearchBarComponent {
  searchText!: string;
  error = false;
  errorText = '';
  @Input() searchPage = false;
  @Input() type = 'artists';
  @Output() closeSearch = new EventEmitter<void>();
  @Output() search = new EventEmitter<{ text: string; type: string }>();

  onKeyUpSearch(event: any) {
    if (event.keyCode === 13) {
      this.validationSearch();
    }
  }

  validationSearch(): void {
    this.search.emit({
      text: this.searchText,
      type: this.type,
    });
    this.searchText = '';
  }
}
