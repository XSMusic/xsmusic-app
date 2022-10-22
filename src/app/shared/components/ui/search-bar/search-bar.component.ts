import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Router } from '@angular/router';
import { ToastService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

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

  constructor(private router: Router, private toast: ToastService) {}

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
