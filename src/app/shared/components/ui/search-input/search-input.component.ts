import { Component, Input, OnInit } from '@angular/core';
import { GetAllDto } from '@interfaces';
import { Artist } from '@models';
import {
  ArtistService,
  SiteService,
  StyleService,
  ToastService,
  TOAST_STATE,
} from '@services';

@Component({
  selector: 'search-input',
  templateUrl: 'search-input.component.html',
})
export class SearchInputComponent implements OnInit {
  @Input() type!: 'artist' | 'site' | 'style';
  @Input() item?: any;
  label = '';
  placeholder = '';
  body: GetAllDto = {
    page: 1,
    pageSize: 5,
    order: ['name', 'asc'],
    filter: [],
    type: 'all',
  };
  selectState = false;
  itemsSearch: any[] = [];
  itemSearch = null;
  constructor(
    private toast: ToastService,
    private artistService: ArtistService,
    private siteService: SiteService,
    private styleService: StyleService
  ) {}

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
    console.log(e);
    if (e && e.length >= 3) {
      this.body.filter = ['name', e];
      let service: any;
      if (this.type === 'artist') {
        service = this.artistService;
      } else if (this.type === 'site') {
        service = this.siteService;
      } else if (this.type === 'style') {
        service = this.styleService;
      }
      service!.getAll(this.body).subscribe({
        next: (response: any) => (this.itemsSearch = response.items),
        error: (error: any) => this.toast.showToast(TOAST_STATE.error, error),
      });
      this.selectState = true;
    } else {
      this.toast.showToast(TOAST_STATE.warning, 'Introduce texto para buscar');
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
