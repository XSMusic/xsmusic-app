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
export class SearchBarComponent implements OnInit {
  filter = false;
  types: { name: string; value: string }[] = [];
  typeSelected = { name: 'Todo', value: 'all' };
  searchText!: string;
  error = false;
  errorText = '';
  @Input() searchPage = false;
  @Input() type = 'artists';
  @Output() closeSearch = new EventEmitter<void>();
  @Output() search = new EventEmitter<{ text: string; type: string }>();

  constructor(private router: Router, private toast: ToastService) {}

  ngOnInit() {
    this.setTypes();
  }

  setTypes() {
    this.types = [
      { name: 'Todo', value: 'all' },
      { name: 'Artistas', value: 'artist' },
      { name: 'Sets', value: 'set' },
      { name: 'Temas', value: 'track' },
    ];
  }

  selectType(type: { name: string; value: string }): void {
    this.filter = false;
    this.typeSelected = type;
  }

  goToSearch(): void {
    if (this.searchText) {
      this.search.emit({
        text: this.searchText,
        type: this.type,
      });
      this.searchText = '';
    } else {
      this.error = true;
      const errorText = 'Tienes que introducir algo en la busqueda';
      this.toast.showToast(TOAST_STATE.warning, errorText);
      setTimeout(() => {
        this.error = false;
        this.errorText = '';
      }, 3000);
    }
  }
}
