import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Router } from '@angular/router';

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
  @Output() closeSearch = new EventEmitter<void>();
  @Output() emitSearchBody = new EventEmitter<{ text: string; type: string }>();

  constructor(private router: Router) {}

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
      if (!this.searchPage) {
        this.closeSearch.emit();
        const url = `/search/${this.searchText}/${this.typeSelected.value}`;
        this.router.navigate([url]);
      } else {
        this.emitSearchBody.emit({
          text: this.searchText,
          type: this.typeSelected.value,
        });
        this.searchText = '';
      }
    } else {
      this.error = true;
      this.errorText = 'Tienes que introducir algo en la busqueda';
      setTimeout(() => {
        this.error = false;
        this.errorText = '';
      }, 3000);
    }
  }
}
