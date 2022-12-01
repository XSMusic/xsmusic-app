import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { StyleService } from '@services';
import { countries } from 'assets/data/countries';
import * as moment from 'moment';
import { filters } from './filter-bar.helper';

@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  animations: [inOutAnimation],
})
export class FilterBarComponent implements OnInit {
  @Input() type:
    | 'generic'
    | 'artists'
    | 'artistsAdmin'
    | 'artistAdmin'
    | 'events'
    | 'eventsAdmin'
    | 'eventsScraping'
    | 'eventAdmin'
    | 'github'
    | 'sites'
    | 'siteAdmin'
    | 'sitesAdmin'
    | 'media'
    | 'mediaAdmin'
    | 'styles'
    | 'styleAdmin' = 'generic';
  itemsA: { name: string; value: any }[] = [];
  itemsB: { name: string; value: any }[] = [];
  itemFilter = '';
  itemValue = '';
  @Output() onFilter = new EventEmitter<{ name: string; value: any }>();

  constructor(private styleService: StyleService) {}

  ngOnInit() {
    this.getFilterItems();
  }

  getFilterItems() {
    this.itemsA = filters
      .find((item) => this.type.indexOf(item.name) !== -1)!
      .items.map((item) => item);
  }

  onFilterNameSelected() {
    if (this.itemFilter === 'country') {
      this.itemsB = countries.map((item) => {
        return {
          name: item.name,
          value: item.id,
        };
      });
    } else if (this.itemFilter === 'styles') {
      this.styleService
        .getAll({
          page: 1,
          pageSize: 100,
          order: ['name', 'asc'],
        })
        .subscribe({
          next: (response) => {
            this.itemsB = response.items.map((item) => {
              return { name: item.name!, value: item.name! };
            });
          },
        });
    } else if (this.itemFilter === 'year') {
      this.itemsB = [];
      for (let i = 2000; i <= Number(moment().format('YYYY')); i++) {
        this.itemsB.push({ name: i.toString(), value: i });
      }
    }
  }

  filter() {
    this.onFilter.emit({ name: this.itemFilter, value: this.itemValue });
  }
}
