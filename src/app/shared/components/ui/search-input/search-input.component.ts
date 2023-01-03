import { Component, Input, OnInit } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { ApiService, TOAST_STATE, UIService } from '@services';
import { GetAllDto } from '@shared/services/api/api.dtos';

@Component({
  selector: 'search-input',
  templateUrl: 'search-input.component.html',
  animations: [inOutAnimation],
})
export class SearchInputComponent implements OnInit {
  @Input() type!: 'artist' | 'site' | 'style';
  @Input() item?: any;
  label = '';
  placeholder = '';
  body: GetAllDto = new GetAllDto({
    pageSize: 5,
    order: ['name', 'asc'],
    filter: [],
    type: 'all',
  });
  selectState = false;
  itemsSearch: any[] = [];
  itemSearch = null;
  constructor(private ui: UIService, private apiService: ApiService) {}

  ngOnInit() {
    this.setInfo();
  }

  setInfo() {
    if (this.type === 'artist') {
      this.label = 'Artista/s';
      this.placeholder = 'Introduce el artista';
    } else if (this.type === 'site') {
      this.label = 'Club/Festival';
      this.placeholder = 'Introduce el club o festival';
    } else if (this.type === 'style') {
      this.label = 'Estilo/s';
      this.placeholder = 'Introduce el estilo';
    }
  }

  closeSelection() {
    this.selectState = false;
  }

  onChangeInput(e: string) {
    if (e && e.length >= 3) {
      this.body.filter = ['name', e];
      this.apiService.getAll(`${this.type}s`, this.body).subscribe({
        next: (response: any) => this.onSearchResultsSuccess(response),
        error: (error: any) =>
          this.ui.toast.showToast(TOAST_STATE.error, error),
      });
      this.selectState = true;
    } else {
      this.ui.toast.showToast(
        TOAST_STATE.warning,
        'Introduce texto para buscar'
      );
    }
  }

  onSearchResultsSuccess(response: any[]) {
    if (response.length > 1) {
      this.itemsSearch = response;
    } else if (response.length === 1) {
      this.onSelect(response[0]);
    }
  }

  onSelect(item: any) {
    if (this.type === 'artist') {
      this.item.artists?.push(item);
    } else if (this.type === 'site') {
      this.item.site = item;
    } else if (this.type === 'style') {
      this.item.styles.push(item);
    }
    this.selectState = false;
    this.itemSearch = null;
  }

  onClickItem(item: { name: string; _id: string }) {
    if (this.type === 'artist') {
      this.item.artists = this.item.artists?.filter(
        (itemI: any) => itemI.name !== item.name
      );
    } else if (this.type === 'style') {
      this.item.styles = this.item.styles?.filter(
        (itemI: any) => itemI.name !== item.name
      );
    } else if (this.type === 'site') {
      this.onChangeInput('Desconocido');
    }
  }
}
